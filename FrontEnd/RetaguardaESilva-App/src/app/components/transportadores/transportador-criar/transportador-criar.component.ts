import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Titulos } from 'src/app/enums/titulos';
import { Cep } from 'src/app/models/cep';
import { Transportador } from 'src/app/models/transportador';
import { BuscarCepService } from 'src/app/services/buscarCep/buscarCep.service';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';
import { TransportadorService } from 'src/app/services/transportador/transportador.service';

@Component({
  selector: 'app-transportador-criar',
  templateUrl: './transportador-criar.component.html',
  styleUrls: ['./transportador-criar.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransportadorCriarComponent implements OnInit {
  titulo =  Titulos.cadastroTransportador;
  form!: FormGroup;
  transportador = {} as Transportador;
  dataHoje!:string;
  cep!:string;
  cepBD = {} as Cep;
  keyError!:string;
  valueError!:string;

  constructor(private router: Router, private fb: FormBuilder, public titu: TituloService, private transportadorService: TransportadorService, private toastr: ToastrService, private spinner: NgxSpinnerService, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService, private buscarCep: BuscarCepService) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.transportador.dataCadastroTransportador = new Date().toISOString().split('T')[0];
    this.validation();
  }

  public Enviar(): void {
    this.spinner.show();
    if(this.form.valid){
      this.transportador = {...this.form.value};
      this.transportador.empresaId = this.authService.empresaId();
      this.transportadorService.addTransportador(this.transportador).subscribe(() => {
        this.router.navigate(['transportadores/lista']);
      },
      (error: any) => {
        console.error(error);
        this.spinner.hide();
        this.toastr.error(error.error);
      },
      () => this.spinner.hide()
    );
  }
}

onKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
}

public validation(): void {
  this.form = this.fb.group({
    nome: [
      null,
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ],
    ],
    logradouro: [null, Validators.required],
    bairro: [null, Validators.required],
    localidade: [null, Validators.required],
    numero: [null, Validators.required],
    cep: [null, Validators.required],
    complemento: [null],
    uf: [null, Validators.required],
    pais: [null, Validators.required],
    telefone: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    cnpj: [null, Validators.required],
    inscricaoMunicipal: [null, Validators.required],
    inscricaoEstadual: [null, Validators.required],
    dataCadastroTransportador: [null, Validators.required],
  });
}

get f(): any {
  return this.form.controls;
}

public cssValidator(campoForm: FormControl | AbstractControl): any {
  return { 'is-invalid': campoForm.errors && campoForm.touched };
}

public Voltar(){
  this.router.navigate(['transportadores/lista']);
}

EnviarCep(cepView: string): void {
  this.buscarCep.buscarCep(cepView).subscribe(
    (_cepBD: any) => {
      this.cepBD = _cepBD;
      console.log(_cepBD);
      Object.entries(this.cepBD).forEach(([key, value]) => {
        this.form.get(key.toLowerCase())?.setValue(value);
        this.form.get('pais')?.setValue('Brasil');
    });
      this._changeDetectorRef.markForCheck();
    },
    error => console.log(error)
  );
}

isTelefone(): boolean{
  return this.transportador.telefone == null ? true : this.transportador.telefone.length < 12 ? true : false;
}

getTelefoneMask(): string{
  return this.isTelefone() ? '99 9999-99999' : '(99) 99999-9999';
}

somenteNumeros(e: any):boolean {
  let charCode = e.charCode ? e.charCode : e.keyCode;
  // charCode 8 = backspace
  // charCode 9 = tab

  if (charCode != 8 && charCode != 9) {
    // charCode 48 equivale a 0
    // charCode 57 equivale a 9
    let max = 10;

    if ((charCode < 48 || charCode > 57)||(e.target.value.length >= max)) return false;
  }
  return true;
}

permissoesDeTela(){
  this.authService.verificaAdministrador();
  this.authService.visualizarCliente();
  this.authService.visualizarEstoque();
  this.authService.visualizarEnderecoProduto();
  this.authService.visualizarFornecedor();
  this.authService.visualizarFuncionario();
  this.authService.visualizarProduto();
  this.authService.visualizarTransportador();
  this.authService.visualizarRelatorio();
  this.authService.visualizarUsuario();
  this.authService.visualizarPedido();
  this.authService.visualizarNotaFiscal();
  this.authService.visualizarRelatorio();
  this.nav.hide();
  this.titu.hide();
  this.titu.showTitulo();
}

}
