import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto/produto.service';
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
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.scss']
})
export class ProdutoListaComponent implements OnInit {
  titulo =  Titulos.listaProduto;
  iconClass = FontAwesome.listaProduto;
  novo = Botoes.novoProduto;
  modalRef?: BsModalRef;
  message?: string;
  public loginUsuario!: Login;
  public produtos: Produto[] = [];
  produto = {} as Produto;
  private _produtoListado = '';
  produtosFiltrados: Produto[] = [];
  produtoNome!: string;
  produtoId!: number;
  visualizarEditar!:boolean;
  visualizarDetalhe!:boolean;
  visualizarExcluir!:boolean;

  public get produtoLista():string{
    return this._produtoListado;
  }

  public set produtoLista(value:string){
    this._produtoListado = value;
    this.produtosFiltrados = this.produtoLista ? this.filtrarProdutos(this.produtoLista) : this.produtos;
  }

  public filtrarProdutos(filtrarPor:string):Produto[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.produtos.filter(
      (produto:any) => produto.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }

  constructor(private router: Router, private produtoService: ProdutoService, public titu: TituloService, public nav: NavService, private authService: AuthService, private modalService: BsModalService, private spinner: NgxSpinnerService, private toastr: ToastrService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getProdutos();
  }

  public getProdutos(): void{
    this.produtoService.getProdutos(this.authService.empresaId()).subscribe(
      (_produtos: Produto[]) => {
        this.produtos = _produtos;
        this.produtosFiltrados = this.produtos;
      },
      error => console.log(error)
    );
  }

  editar(id: number): void {
    this.router.navigate([`produtos/editar/${id}`]);
  }

  detalhe(id: number): void {
    this.router.navigate([`produtos/detalhe/${id}`]);
  }

  openModal(event: any, template: TemplateRef<any>, produtoNome: string, produtoId: number): void {
    event.stopPropagation();
    this.produtoNome = produtoNome;
    this.produtoId = produtoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.produtoService.delete(this.produtoId).subscribe(
      (result: any) =>{
        console.log(result.message);
          this.toastr.success(result.message);
          this.getProdutos();
          this.produtos = this.produtos.filter(c => c.id !== this.produtoId);
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
