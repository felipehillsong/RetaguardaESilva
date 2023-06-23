import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Botoes } from 'src/app/enums/botoes';
import { FontAwesome } from 'src/app/enums/fontAwesome';
import { Titulos } from 'src/app/enums/titulos';
import { Login } from 'src/app/models/login';
import { NotaFiscal } from 'src/app/models/notaFiscal';
import { Pedido } from 'src/app/models/pedido';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { NotaFiscalService } from 'src/app/services/notaFiscal/notaFiscal.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-pedido-lista',
  templateUrl: './pedido-lista.component.html',
  styleUrls: ['./pedido-lista.component.scss']
})
export class PedidoListaComponent implements OnInit {
  titulo =  Titulos.listaPedidos;
  iconClass = FontAwesome.listaPedido;
  novo = Botoes.novoPedido;
  modalRef?: BsModalRef;
  message?: string;
  public loginUsuario!: Login;
  public pedidos: Pedido[] = [];
  public notasFiscais: NotaFiscal[] = [];
  private _clienteNomeListado = '';
  pedidosFiltrados: Pedido[] = [];
  pedidoId!: number;
  visualizarEditar!:boolean;
  visualizarDetalhe!:boolean;
  visualizarExcluir!:boolean;

  public get clienteNomeLista():string{
    return this._clienteNomeListado;
  }

  public set clienteNomeLista(value:string){
    this._clienteNomeListado = value;
    this.pedidosFiltrados = this.clienteNomeLista ? this.filtrarPedidos(this.clienteNomeLista) : this.pedidos;
  }

  public filtrarPedidos(filtrarPor:string):Pedido[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.pedidos.filter(
      (pedido:any) => pedido.clienteNome.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }

  constructor(private router: Router, private notaFiscalService: NotaFiscalService, private pedidoService: PedidoService, public titu: TituloService, public nav: NavService, private authService: AuthService, private modalService: BsModalService, private spinner: NgxSpinnerService, private toastr: ToastrService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getPedidos();
  }

  public getPedidos(): void{
    this.pedidoService.getPedidos(this.authService.empresaId()).subscribe(
      (_pedidos: Pedido[]) => {
        this.pedidos = _pedidos;
        this.pedidosFiltrados = this.pedidos;
        console.log(this.pedidos);
        this.getNotasFiscais();
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public getNotasFiscais(): void{
    this.notaFiscalService.getNotasFiscais(this.authService.empresaId()).subscribe(
      (_notasFiscais: NotaFiscal[]) => {
        this.notasFiscais = _notasFiscais;
        console.log(this.notasFiscais);
        this.preencherNotasFiscais(this.pedidos);
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public preencherNotasFiscais(pedidos: Pedido[]){
     for (const pedido of pedidos) {
      const notaFiscal = this.notasFiscais.find(nf => nf.pedidoId === pedido.id);
      if (notaFiscal) {
        pedido.possuiNotaFiscal = true;
      }else{
        pedido.possuiNotaFiscal = false;
      }
    }
  }

  editar(id: number): void {
    this.router.navigate([`pedidos/editar/${id}`]);
  }

  detalhe(id: number): void {
    this.router.navigate([`pedidos/detalhe/${id}`]);
  }

  openModal(event: any, template: TemplateRef<any>, pedidoId: number): void {
    event.stopPropagation();
    this.pedidoId = pedidoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.pedidoService.delete(this.pedidoId).subscribe(
      (result: any) =>{
        console.log(result.message);
          this.toastr.success(result.message);
          this.getPedidos();
          this.pedidos = this.pedidos.filter(c => c.id !== this.pedidoId);
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
