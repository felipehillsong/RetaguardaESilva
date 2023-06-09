import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Permissoes } from 'src/app/enums/permissoes';
import { Senhas } from 'src/app/enums/senhas';
import { Titulos } from 'src/app/enums/titulos';
import { Funcionario } from 'src/app/models/funcionario';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.scss']
})
export class UsuarioEditarComponent implements OnInit {
  titulo =  Titulos.editarUsuario;
  form!: FormGroup;
  funcionarioUsuario = {} as Funcionario;
  usuario = {} as Usuario;
  usuarioLogin = {} as Usuario;
  dataHoje!:string;
  keyError!:string;
  valueError!:string;
  usuarioId!: number;
  funcionarioId!: number;
  senhaBD!:string;
  modalRef: any;
  constructor(private router: Router, private fb: FormBuilder, public titu: TituloService, private usuarioService: UsuarioService, public nav: NavService, private authService: AuthService, private spinner: NgxSpinnerService, private toastr: ToastrService, private _changeDetectorRef: ChangeDetectorRef, private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getUsaurioById();
    this.validation();
  }

  public getUsaurioById(): void{
    this.usuarioId = this.route.snapshot.params['id'];
    this.usuarioService.getUsuarioById(this.usuarioId).subscribe(
      (_usuario: Usuario) => {
        this.usuario = _usuario;
        this.senhaBD = this.usuario.senha;
        this.funcionarioId = this.usuario.funcionarioId;
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public Voltar(){
    this.router.navigate(['usuarios/lista']);
  }

  Salvar():void{
    this.spinner.show();
    var senha = this.verificarSenhas(this.form.value.senha, this.form.value.repetirSenha)
    if(senha == Senhas.senhaOriginal){
      if(this.form.valid){
        this.usuario.funcionarioId = this.funcionarioId;
        this.usuario.ativo = this.usuario.ativo;
        this.usuario.empresaId = this.authService.empresaId();
        this.usuario.senha = this.senhaBD;
        this.usuarioService.editUsuario(this.usuario).subscribe(() => {
          this.toastr.success("Dados alterados com sucesso");
          if(this.usuario.funcionarioId == this.funcionarioId && this.authService.idDoUsuarioLogado() == this.usuarioId){
            sessionStorage.clear();
            sessionStorage.setItem('loginRetorno', JSON.stringify(this.usuario));
          this.router.navigate(['usuarios/lista']);
          }
          this.router.navigate(['usuarios/lista']);
          this._changeDetectorRef.markForCheck();
          this.spinner.hide();
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error(error.error);
        },
        () => this.spinner.hide()
      );
    }
    }else if(senha == Senhas.senhaEmBranco){
      if(this.form.valid){
        this.usuario.funcionarioId = this.funcionarioId;
        this.usuario.ativo = this.usuario.ativo;
        this.usuario.empresaId = this.authService.empresaId();
        this.usuario.senha = this.senhaBD;
        this.usuarioService.editUsuario(this.usuario).subscribe(() => {
          this.toastr.success("Dados alterados com sucesso");
          if(this.usuario.funcionarioId == this.funcionarioId && this.authService.idDoUsuarioLogado() == this.usuarioId){
            sessionStorage.clear();
            sessionStorage.setItem('loginRetorno', JSON.stringify(this.usuario));
          this.router.navigate(['usuarios/lista']);
          }
          this.router.navigate(['usuarios/lista']);
          this._changeDetectorRef.markForCheck();
          this.spinner.hide();
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error(error.error);
        },
        () => this.spinner.hide()
      );
    }
    }else if(senha == Senhas.SenhaIgual){
      if(this.form.valid){
        this.usuario.funcionarioId = this.funcionarioId;
        this.usuario.ativo = this.usuario.ativo;
        this.usuario.empresaId = this.authService.empresaId();
        this.usuarioService.editUsuario(this.usuario).subscribe(() => {
          this.toastr.success("Dados alterados com sucesso");
          if(this.usuario.funcionarioId == this.funcionarioId && this.authService.idDoUsuarioLogado() == this.usuarioId){
            sessionStorage.clear();
            sessionStorage.setItem('loginRetorno', JSON.stringify(this.usuario));
          this.router.navigate(['usuarios/lista']);
          }
          this.router.navigate(['usuarios/lista']);
          this._changeDetectorRef.markForCheck();
          this.spinner.hide();
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
    else{
      this.toastr.error("Senhas não conferem");
      this.spinner.hide();
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
      email: [null, [Validators.required, Validators.email]],
      senha: [null],
      repetirSenha: [null]
    });
  }

  verificarSenhas(senha: string, repetirSenha: string):string{
    if(senha == this.senhaBD && repetirSenha == null || senha == this.senhaBD && repetirSenha == ""){
      return Senhas.senhaOriginal;
    }
    else if(senha == null && repetirSenha == null || senha == "" && repetirSenha == null || senha == null && repetirSenha == "" || senha == "" && repetirSenha == ""){
      return Senhas.senhaEmBranco;
    }
    else if(senha == repetirSenha){
      return Senhas.SenhaIgual;
    }else{
      return Senhas.senhaErro;
    }
  }

  get f(): any {
    return this.form.controls;
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
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
