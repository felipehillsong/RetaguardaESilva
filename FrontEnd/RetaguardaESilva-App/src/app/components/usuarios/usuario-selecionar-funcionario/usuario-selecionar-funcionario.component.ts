import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Titulos } from 'src/app/enums/titulos';
import { Funcionario } from 'src/app/models/funcionario';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-usuario-selecionar-funcionario',
  templateUrl: './usuario-selecionar-funcionario.component.html',
  styleUrls: ['./usuario-selecionar-funcionario.component.scss']
})
export class UsuarioSelecionarFuncionarioComponent implements OnInit {
  titulo =  Titulos.selecionarFuncionario;
  modalRef?: BsModalRef;
  message?: string;
  public loginUsuario!: Login;
  public funcionariosUsuarios: Funcionario[] = [];
  funcionariosUsuariosFiltrados: Funcionario[] = [];
  funcionarioUsuarioNome!: string;
  funcionarioUsuarioId!: number;
  private _funcionarioUsuarioListado = '';

  public get funcionarioUsuarioLista():string{
    return this._funcionarioUsuarioListado;
  }

  public set funcionarioUsuarioLista(value:string){
    this._funcionarioUsuarioListado = value;
    this.funcionariosUsuariosFiltrados = this.funcionarioUsuarioLista ? this.filtrarFuncionarioUsuario(this.funcionarioUsuarioLista) : this.funcionariosUsuarios;
  }

  public filtrarFuncionarioUsuario(filtrarPor:string):Funcionario[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.funcionariosUsuarios.filter(
      (funcionario:any) => funcionario.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }

  constructor(private router: Router, public titu: TituloService, private usuarioService: UsuarioService, public nav: NavService, private authService: AuthService, private modalService: BsModalService, private spinner: NgxSpinnerService, private toastr: ToastrService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.permissoesDeTela();
    this.getFuncionarios();
  }

  public getFuncionarios(): void{
    this.usuarioService.getFuncionariosUsuarios(this.authService.empresaId()).subscribe(
      (_funcionariosUsuarios: Funcionario[]) => {
        this.funcionariosUsuarios = _funcionariosUsuarios;
        this.funcionariosUsuariosFiltrados = this.funcionariosUsuarios;
      },
      error => console.log(error)
    );
  }

  public Voltar(){
    this.router.navigate(['usuarios/lista']);
  }

  openModal(event: any, template: TemplateRef<any>, funcionarioUsuarioNome: string, funcionarioUsuarioId: number): void {
    event.stopPropagation();
    this.funcionarioUsuarioNome = funcionarioUsuarioNome;
    this.funcionarioUsuarioId = funcionarioUsuarioId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(id: number): void {
      this.router.navigate([`usuarios/criar/${id}`]);
      this.decline();
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
    this.nav.hide();
    this.titu.hide();
    this.titu.showTitulo();
  }

}
