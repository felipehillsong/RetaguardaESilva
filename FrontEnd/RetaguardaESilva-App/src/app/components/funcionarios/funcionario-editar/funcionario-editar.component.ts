import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Titulos } from 'src/app/enums/titulos';
import { Cep } from 'src/app/models/cep';
import { Funcionario } from 'src/app/models/funcionario';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/login/auth.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-funcionario-editar',
  templateUrl: './funcionario-editar.component.html',
  styleUrls: ['./funcionario-editar.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuncionarioEditarComponent implements OnInit {
  titulo =  Titulos.editarFuncionario;
  form!: FormGroup;
  funcionario = {} as Funcionario;
  dataHoje!:string;
  cep!:string;
  cepBD = {} as Cep;
  keyError!:string;
  valueError!:string;
  funcionarioId!: number;
  ativo!:string;
  usuarioLogin = {} as Usuario;
  nome!: string;
  email!: string;

  constructor(private router: Router, private fb: FormBuilder, public titu: TituloService, private funcionarioService: FuncionarioService, private toastr: ToastrService, private spinner: NgxSpinnerService, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getFuncionarioById();
    this.validation();
  }

  public getFuncionarioById(): void{
    this.funcionarioId = this.route.snapshot.params['id'];
    this.funcionarioService.getFuncionarioById(this.funcionarioId).subscribe(
      (_funcionario: Funcionario) => {
        this.funcionario = _funcionario;
        this.nome = this.funcionario.nome;
        this.email = this.funcionario.email;
        this.preencherSelect();
        var dataBD = moment(this.funcionario.dataCadastroFuncionario).format('YYYY-MM-DD');
        this.funcionario.dataCadastroFuncionario = dataBD;
        this.usuarioLogin = this.authService.dadosDoUsuario();
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public preencherSelect(){
    if(this.funcionario.ativo == true){
      this.ativo = 'Ativo';
      return [
        { id: '0', name: 'Inativo' },
        { id: '1', name: this.ativo }
      ];
    }else if(this.funcionario.ativo == false){
      this.ativo = 'Inativo';
      return [
        { id: '0', name: this.ativo },
        { id: '1', name: 'Ativo' },
      ];
    }else{
      return [
        { id: '0', name: 'Error' },
        { id: '1', name: 'Error' },
      ];
    }
  }

  public preencherAtivo(forms:any){
    if(forms.ativo == "Ativo"){
      this.funcionario.ativo = true;
    }
    else{
      this.funcionario.ativo = false;
    }
  }

  public Editar(): void {
    this.spinner.show();
    if(this.form.valid){
      this.funcionario = {...this.form.value};
      this.funcionario.id = this.funcionarioId;
      this.preencherAtivo(this.form.value);
      this.funcionario.empresaId = this.authService.empresaId();
      this.funcionarioService.editFuncionarios(this.funcionario).subscribe(() => {
        this.toastr.success("Dados alterados com sucesso");
          if(this.funcionario.id == this.usuarioLogin.funcionarioId){
            this.usuarioLogin.nome = this.form.value.nome;
            this.usuarioLogin.email = this.form.value.email;
            sessionStorage.clear();
            sessionStorage.setItem('loginRetorno', JSON.stringify(this.usuarioLogin));
          this.router.navigate(['funcionarios/lista']);
          }
          this.router.navigate(['funcionarios/lista']);
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
    cpf: [null, Validators.required],
    dataCadastroFuncionario: [null, Validators.required],
    ativo: [null, Validators.required]
  });
}

get f(): any {
  return this.form.controls;
}

public cssValidator(campoForm: FormControl | AbstractControl): any {
  return { 'is-invalid': campoForm.errors && campoForm.touched };
}

public Voltar(){
  this.router.navigate(['funcionarios/lista']);
}

EnviarCep(cepView: string): void {
  this.funcionarioService.getCep(cepView).subscribe(
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
  return this.funcionario.telefone == null ? true : this.funcionario.telefone.length < 12 ? true : false;
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
