import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Botoes } from 'src/app/enums/botoes';
import { FontAwesome } from 'src/app/enums/fontAwesome';
import { Titulos } from 'src/app/enums/titulos';
import { EnderecoProduto } from 'src/app/models/enderecoProduto';
import { Estoque } from 'src/app/models/estoque';
import { Login } from 'src/app/models/login';
import { EstoqueService } from 'src/app/services/estoque/estoque.service';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-estoque-lista',
  templateUrl: './estoque-lista.component.html',
  styleUrls: ['./estoque-lista.component.scss']
})
export class EstoqueListaComponent implements OnInit {
  titulo =  Titulos.listaEstoques;
  iconClass = FontAwesome.listaEstoque;
  novo = Botoes.listaEnderecoProduto;
  modalRef?: BsModalRef;
  message?: string;
  public loginUsuario!: Login;
  public estoques: Estoque[] = [];
  private _estoqueListado = '';
  estoquesFiltrados: Estoque[] = [];
  enderecoProduto = {} as EnderecoProduto;
  produtoNome!: string;
  enderecoNome!:string;
  estoqueId!: number;
  enderecoProdutoId!:number;
  visualizarEditar!:boolean;
  visualizarDetalhe!:boolean;
  visualizarExcluir!:boolean;
  visualizarAdicionarEndereco!:boolean;
  visualizarEditarEndereco!:boolean;
  visualizarDetalheEndereco!:boolean;
  visualizarExcluirEndereco!:boolean;

  public get estoqueLista():string{
    return this._estoqueListado;
  }

  public set estoqueLista(value:string){
    this._estoqueListado = value;
    this.estoquesFiltrados = this.estoqueLista ? this.filtrarEstoques(this.estoqueLista) : this.estoques;
  }

  public filtrarEstoques(filtrarPor:string):Estoque[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.estoques.filter(
      (estoque:any) => estoque.produtoNome.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }

  constructor(private router: Router, private estoqueService: EstoqueService, public titu: TituloService, public nav: NavService, private authService: AuthService, private modalService: BsModalService, private spinner: NgxSpinnerService, private toastr: ToastrService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getEstoques();
  }

  public getEstoques(): void{
    this.estoqueService.getEstoques(this.authService.empresaId()).subscribe(
      (_estoques: Estoque[]) => {
        this.estoques = _estoques;
        this.estoquesFiltrados = this.estoques;
      },
      error => console.log(error)
    );
  }

  editar(id: number): void {
    this.router.navigate([`estoques/editar/${id}`]);
  }

  detalhe(id: number): void {
    this.router.navigate([`estoques/detalhe/${id}`]);
  }

  adicionarEndereco(id: number): void {
    this.router.navigate([`enderecosProdutos/criar/${id}`]);
  }

  editarEndereco(id: number): void {
    this.router.navigate([`enderecosProdutos/editar/${id}`]);
  }

  detalheEndereco(id: number): void {
    this.router.navigate([`enderecosProdutos/detalhe/${id}`]);
  }

  excluirEndereco(event: any, template: TemplateRef<any>, enderecoProdutoId:number):void{
    this.estoqueService.getEnderecoProdutoById(enderecoProdutoId).subscribe(
      (_enderecoProduto: EnderecoProduto) => {
        this.enderecoProduto = _enderecoProduto;
        this.enderecoProdutoId = this.enderecoProduto.id;
        this.openModalEnderecoProduto(event, template, this.enderecoProduto.nomeEndereco, enderecoProdutoId);
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  openModal(event: any, template: TemplateRef<any>, produtoNome: string, estoqueId: number): void {
    event.stopPropagation();
    this.produtoNome = produtoNome;
    this.estoqueId = estoqueId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  openModalEnderecoProduto(event: any, templateEnderecoProduto: TemplateRef<any>, enderecoNome: string, estoqueId: number): void {
    event.stopPropagation();
    this.enderecoNome = enderecoNome;
    this.estoqueId = estoqueId;
    this.modalRef = this.modalService.show(templateEnderecoProduto, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.estoqueService.delete(this.estoqueId).subscribe(
      (result: any) =>{
        console.log(result.message);
          this.toastr.success(result.message);
          this.getEstoques();
          this.estoques = this.estoques.filter(e => e.id !== this.estoqueId);
          this._changeDetectorRef.markForCheck();
      },
      (error: any) =>{
        console.log(error);
        this.toastr.error(error.error);
      }
    ).add(() => this.spinner.hide());
  }

  confirmEnderecoProduto(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.estoqueService.deleteEnderecoProduto(this.enderecoProdutoId).subscribe(
      (result: any) =>{
        console.log(result.message);
          this.toastr.success(result.message);
          this.getEstoques();
          this.estoques = this.estoques.filter(e => e.id !== this.estoqueId);
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

  declineEnderecoProduto(): void {
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
    this.visualizarAdicionarEndereco = validar[3];
    this.visualizarEditarEndereco = validar[4];
    this.visualizarDetalheEndereco = validar[5];
    this.visualizarExcluirEndereco = validar[6];
  }

}
