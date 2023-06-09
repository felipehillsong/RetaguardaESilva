import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Titulos } from 'src/app/enums/titulos';
import { Funcionario } from 'src/app/models/funcionario';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-usuario-criar',
  templateUrl: './usuario-criar.component.html',
  styleUrls: ['./usuario-criar.component.scss']
})
export class UsuarioCriarComponent implements OnInit {
  titulo =  Titulos.cadastroUsuario;
  form!: FormGroup;
  funcionarioUsuario = {} as Funcionario;
  funcionarioNome!:string;
  usuario = {} as Usuario;
  dataHoje!:string;
  keyError!:string;
  valueError!:string;
  funcionarioUsuarioId!: number;
  readonly = true;

  constructor(private router: Router, private fb: FormBuilder, public titu: TituloService, private usuarioService: UsuarioService, public nav: NavService, private authService: AuthService, private spinner: NgxSpinnerService, private toastr: ToastrService, private _changeDetectorRef: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getFuncionarioUsaurioById();
    this.validation();
  }

  public getFuncionarioUsaurioById(): void{
    this.funcionarioUsuarioId = this.route.snapshot.params['id'];
    this.usuarioService.getFuncionariosUsuariosById(this.funcionarioUsuarioId).subscribe(
      (_funcionarioUsuario: Funcionario) => {
        this.funcionarioUsuario = _funcionarioUsuario;
        var dataBD = moment(this.funcionarioUsuario.dataCadastroFuncionario).format('YYYY-MM-DD');
        this.funcionarioUsuario.dataCadastroFuncionario = dataBD;
        this.funcionarioNome = this.funcionarioUsuario.nome;
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public Voltar(){
    this.router.navigate(['usuarios/selecionar-funcionario']);
  }

  Salvar():void{
    this.spinner.show();
    if(this.verificarSenhas(this.form.value.senha, this.form.value.repetirSenha)){
      if(this.form.valid){
        this.usuario.funcionarioId = this.funcionarioUsuarioId;
        this.usuario.email = this.form.value.email;
        this.usuario.senha = this.form.value.senha;
        this.usuario.dataCadastroUsuario = new Date().toISOString().split('T')[0];
        this.usuario.empresaId = this.funcionarioUsuario.empresaId;
        this.usuarioService.addUsuario(this.usuario).subscribe(() => {
          this.router.navigate(['usuarios/lista']);
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
    }else{
      this.toastr.error("Senhas não conferem");
      this.spinner.hide();
    }
  }

  public validation(): void {
    this.form = this.fb.group({
      email: [null],
      senha: [null, Validators.required],
      repetirSenha: [null, Validators.required]
    });
  }

  verificarSenhas(senha: string, repetirSenha: string):boolean{
    if(senha == repetirSenha){
      return true;
    }else{
      return false;
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
