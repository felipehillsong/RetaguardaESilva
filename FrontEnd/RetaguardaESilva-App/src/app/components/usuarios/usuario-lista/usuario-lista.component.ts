import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Botoes } from 'src/app/enums/botoes';
import { FontAwesome } from 'src/app/enums/fontAwesome';
import { Titulos } from 'src/app/enums/titulos';
import { Login } from 'src/app/models/login';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.scss']
})
export class UsuarioListaComponent implements OnInit {
  titulo =  Titulos.listaUsuarios;
  iconClass = FontAwesome.listaUsuario;
  novo = Botoes.SelecionarioFuncionario;
  modalRef?: BsModalRef;
  message?: string;
  public loginUsuario!: Login;
  public usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  usuarioNome!: string;
  usuarioId!: number;
  private _usuarioListado = '';
  visualizarEditar!:boolean;
  visualizarPermissao!:boolean;
  visualizarExcluir!:boolean;
  visualizarPermissaoExcluir!: boolean;

  public get usuarioLista():string{
    return this._usuarioListado;
  }

  public set usuarioLista(value:string){
    this._usuarioListado = value;
    this.usuariosFiltrados = this.usuarioLista ? this.filtrarUsuarios(this.usuarioLista) : this.usuarios;
  }

  public filtrarUsuarios(filtrarPor:string):Usuario[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.usuarios.filter(
      (usuario:any) => usuario.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }

  constructor(private router: Router, public titu: TituloService, private usuarioService: UsuarioService, public nav: NavService, private authService: AuthService, private modalService: BsModalService, private spinner: NgxSpinnerService, private toastr: ToastrService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getUsuarios();
  }

  public getUsuarios(): void{
    this.usuarioService.getUsuarios(this.authService.empresaId()).subscribe(
      (_usuarios: Usuario[]) => {
        this.usuarios = _usuarios;
        this.usuariosFiltrados = this.usuarios;
        this.PreencherBotaoExcluir(this.usuarios);
      },
      error => console.log(error)
    );
  }

  public PreencherBotaoExcluir(usuarios:Usuario[]){
    for(var i = 0; i < usuarios.length; i++){
      if(this.authService.idDoUsuarioLogado() == usuarios[i].id){
        usuarios[i].botaoExcluir = false;
      }else{
        usuarios[i].botaoExcluir = true;
      }
    }
  }

  editar(id: number): void {
    this.router.navigate([`usuarios/editar/${id}`]);
  }

  detalhe(id: number): void {
    this.router.navigate([`usuarios/detalhe/${id}`]);
  }

  permissoes(id: number): void {
    this.router.navigate([`usuarios/permissao/${id}`]);
  }

  openModal(event: any, template: TemplateRef<any>, usuarioNome: string, usuarioId: number): void {
    event.stopPropagation();
    this.usuarioNome = usuarioNome;
    this.usuarioId = usuarioId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.usuarioService.delete(this.usuarioId).subscribe(
      (result: any) =>{
        console.log(result.message);
          this.toastr.success(result.message);
          this.spinner.hide();
          this.getUsuarios();
          this.usuarios = this.usuarios.filter(f => f.id !== this.usuarioId);
          this._changeDetectorRef.markForCheck();
      },
      (error: any) =>{
        console.log(error);
        this.toastr.error(error.error);
      }
    ).add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef?.hide();
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
    this.nav.show();
    this.titu.show();
    this.titu.hideTitulo();
  }

  public validaCrud(validar:boolean[]){
    this.visualizarEditar = validar[0];
    this.visualizarPermissao = validar[1];
    this.visualizarExcluir = validar[2];
  }

}
