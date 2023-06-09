import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Titulos } from 'src/app/enums/titulos';
import { Cep } from 'src/app/models/cep';
import { Empresa } from 'src/app/models/empresa';
import { AuthService } from 'src/app/services/login/auth.service';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-empresa-criar',
  templateUrl: './empresa-criar.component.html',
  styleUrls: ['./empresa-criar.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpresaCriarComponent implements OnInit {
  titulo =  Titulos.cadastroEmpresa;
  form!: FormGroup;
  empresa = {} as Empresa;
  dataHoje!:string;
  cep!:string;
  cepBD = {} as Cep;
  keyError!:string;
  valueError!:string;


  constructor(private router: Router, public titu: TituloService, private fb: FormBuilder, private empresaService: EmpresaService, private toastr: ToastrService, private spinner: NgxSpinnerService, private datePipe: DatePipe, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.empresa.dataCadastroEmpresa = new Date().toISOString().split('T')[0];
    this.validation();
  }

  public Enviar(): void {
    this.spinner.show();
    if(this.form.valid){
      this.empresa = {...this.form.value};
      this.empresa.empresaId = this.authService.empresaId();
      this.empresaService.addEmpresa(this.empresa).subscribe(() => {
        this.router.navigate(['empresas/lista']);
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
      endereco: [null, Validators.required],
      bairro: [null, Validators.required],
      municipio: [null, Validators.required],
      numero: [null, Validators.required],
      cep: [null, Validators.required],
      complemento: [null],
      uf: [null, Validators.required],
      pais: [null],
      telefone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      cnpj: [null, Validators.required],
      inscricaoMunicipal: [null, Validators.required],
      inscricaoEstadual: [null, Validators.required],
      dataCadastroEmpresa: [null, Validators.required],
    });
  }

  get f(): any {
    return this.form.controls;
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public Voltar(){
    this.router.navigate(['empresas/lista']);
  }

  EnviarCep(cepView: string): void {
    this.empresaService.getCep(cepView).subscribe(
      (_cepBD: any) => {
        this.cepBD = _cepBD;
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
    return this.empresa.telefone == null ? true : this.empresa.telefone.length < 12 ? true : false;
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
