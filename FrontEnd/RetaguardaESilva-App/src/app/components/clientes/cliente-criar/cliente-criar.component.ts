import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Titulos } from 'src/app/enums/titulos';
import { Cep } from 'src/app/models/cep';
import { Cliente } from 'src/app/models/cliente';
import { AuthService } from 'src/app/services/login/auth.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';
import { BuscarCepService } from 'src/app/services/buscarCep/buscarCep.service';

@Component({
  selector: 'app-cliente-criar',
  templateUrl: './cliente-criar.component.html',
  styleUrls: ['./cliente-criar.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClienteCriarComponent implements OnInit {
  titulo =  Titulos.cadastroCliente;
  form!: FormGroup;
  cliente = {} as Cliente;
  dataHoje!:string;
  cep!:string;
  cepBD = {} as Cep;
  keyError!:string;
  valueError!:string;

  constructor(private router: Router, private fb: FormBuilder, private clienteService: ClienteService, private toastr: ToastrService, private spinner: NgxSpinnerService, private datePipe: DatePipe, public titu: TituloService, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService, private buscarCep: BuscarCepService) { }

  ngOnInit(): void {
    this.permissoesDeTela();
    this.cliente.dataCadastroCliente = new Date().toISOString().split('T')[0];
    this.validation();
  }

  public Enviar(): void {
    this.spinner.show();
    if(this.form.valid){
      this.cliente = {...this.form.value};
      this.cliente.empresaId = this.authService.empresaId();
      this.clienteService.addCliente(this.cliente).subscribe(() => {
        this.router.navigate(['clientes/lista']);
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
      pais: [null],
      telefone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      cpfcnpj: [null, Validators.required],
      inscricaoMunicipal: [null],
      inscricaoEstadual: [null],
      dataCadastroCliente: [null, Validators.required],
    });
  }

  get f(): any {
    return this.form.controls;
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public Voltar(){
    this.router.navigate(['clientes/lista']);
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

  isCPF(): boolean{
    return this.cliente.cpfcnpj == null ? true : this.cliente.cpfcnpj.length < 12 ? true : false;
  }

 getCpfCnpjMask(): string{
    return this.isCPF() ? '000.000.000-009' : '00.000.000/0000-00';
  }

  isTelefone(): boolean{
    return this.cliente.telefone == null ? true : this.cliente.telefone.length < 12 ? true : false;
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
