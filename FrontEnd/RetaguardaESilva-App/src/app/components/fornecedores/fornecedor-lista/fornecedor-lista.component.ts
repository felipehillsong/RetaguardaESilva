import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Botoes } from 'src/app/enums/botoes';
import { FontAwesome } from 'src/app/enums/fontAwesome';
import { Titulos } from 'src/app/enums/titulos';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/login/auth.service';
import { FornecedorService } from 'src/app/services/fornecedor/fornecedor.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-fornecedor-lista',
  templateUrl: './fornecedor-lista.component.html',
  styleUrls: ['./fornecedor-lista.component.scss']
})
export class FornecedorListaComponent implements OnInit {
  titulo =  Titulos.listaFornecedores;
  iconClass = FontAwesome.listaFornecedor;
  novo = Botoes.novoFornecedor;
  modalRef?: BsModalRef;
  message?: string;
  public loginUsuario!: Login;
  public fornecedores: Fornecedor[] = [];
  fornecedoresFiltrados: Fornecedor[] = [];
  private _fornecedorListado = '';
  fornecedorNome!: string;
  fornecedorId!: number;
  visualizarEditar!:boolean;
  visualizarDetalhe!:boolean;
  visualizarExcluir!:boolean;


  public get fornecedorLista():string{
    return this._fornecedorListado;
  }

  public set fornecedorLista(value:string){
    this._fornecedorListado = value;
    this.fornecedoresFiltrados = this.fornecedorLista ? this.filtrarFornecedores(this.fornecedorLista) : this.fornecedores;
  }

  public filtrarFornecedores(filtrarPor:string):Fornecedor[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.fornecedores.filter(
      (fornecedor:any) => fornecedor.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }


  constructor(private router: Router, private fornecedorService: FornecedorService, public titu: TituloService, public nav: NavService, private authService: AuthService, private modalService: BsModalService, private spinner: NgxSpinnerService, private toastr: ToastrService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.permissoesDeTela();
    this.getFornecedores();
  }

  public getFornecedores(): void{
    this.fornecedorService.getFornecedores(this.authService.empresaId()).subscribe(
      (_fornecedores: Fornecedor[]) => {
        this.fornecedores = _fornecedores;
        this.fornecedoresFiltrados = this.fornecedores;
      },
      error => console.log(error)
    );
  }

  editar(id: number): void {
    this.router.navigate([`fornecedores/editar/${id}`]);
  }

  detalhe(id: number): void {
    this.router.navigate([`fornecedores/detalhe/${id}`]);
  }

  openModal(event: any, template: TemplateRef<any>, fornecedorNome: string, fornecedorId: number): void {
    event.stopPropagation();
    this.fornecedorNome = fornecedorNome;
    this.fornecedorId = fornecedorId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.fornecedorService.delete(this.fornecedorId).subscribe(
      (result: any) =>{
        console.log(result.message);
          this.toastr.success(result.message);
          this.spinner.hide();
          this.getFornecedores();
          this.fornecedores = this.fornecedores.filter(f => f.id !== this.fornecedorId);
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
