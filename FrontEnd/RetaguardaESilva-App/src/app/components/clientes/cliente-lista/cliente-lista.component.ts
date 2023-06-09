import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { Login } from 'src/app/models/login';
import { NavService } from 'src/app/services/nav/nav.service';
import { AuthService } from 'src/app/services/login/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Titulos } from 'src/app/enums/titulos';
import { FontAwesome } from 'src/app/enums/fontAwesome';
import { Botoes } from 'src/app/enums/botoes';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss'],
})
export class ClienteListaComponent implements OnInit {
  titulo =  Titulos.listaClientes;
  iconClass = FontAwesome.listaCliente;
  novo = Botoes.novoCliente;
  modalRef?: BsModalRef;
  message?: string;
  public loginUsuario!: Login;
  public clientes: Cliente[] = [];
  private _clienteListado = '';
  clientesFiltrados: Cliente[] = [];
  clienteNome!: string;
  clienteId!: number;
  visualizarEditar!:boolean;
  visualizarDetalhe!:boolean;
  visualizarExcluir!:boolean;

  public get clienteLista():string{
    return this._clienteListado;
  }

  public set clienteLista(value:string){
    this._clienteListado = value;
    this.clientesFiltrados = this.clienteLista ? this.filtrarClientes(this.clienteLista) : this.clientes;
  }

  public filtrarClientes(filtrarPor:string):Cliente[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.clientes.filter(
      (cliente:any) => cliente.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }

  constructor(private router: Router, private clienteService: ClienteService, public titu: TituloService, public nav: NavService, private authService: AuthService, private modalService: BsModalService, private spinner: NgxSpinnerService, private toastr: ToastrService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.permissoesDeTela();
    this.getClientes();
  }

  public getClientes(): void{
    this.clienteService.getClientes(this.authService.empresaId()).subscribe(
      (_clientes: Cliente[]) => {
        this.clientes = _clientes;
        this.clientesFiltrados = this.clientes;
      },
      error => console.log(error)
    );
  }

  editar(id: number): void {
    this.router.navigate([`clientes/editar/${id}`]);
  }

  detalhe(id: number): void {
    this.router.navigate([`clientes/detalhe/${id}`]);
  }

  openModal(event: any, template: TemplateRef<any>, clienteNome: string, clienteId: number): void {
    event.stopPropagation();
    this.clienteNome = clienteNome;
    this.clienteId = clienteId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.clienteService.delete(this.clienteId).subscribe(
      (result: any) =>{
        console.log(result.message);
          this.toastr.success(result.message);
          this.getClientes();
          this.clientes = this.clientes.filter(c => c.id !== this.clienteId);
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
    this.visualizarDetalhe = validar[1];
    this.visualizarExcluir = validar[2];
  }

}
