import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Botoes } from 'src/app/enums/botoes';
import { FontAwesome } from 'src/app/enums/fontAwesome';
import { Titulos } from 'src/app/enums/titulos';
import { Empresa } from 'src/app/models/empresa';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/login/auth.service';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-empresa-lista',
  templateUrl: './empresa-lista.component.html',
  styleUrls: ['./empresa-lista.component.scss']
})
export class EmpresaListaComponent implements OnInit {
  titulo =  Titulos.listaEmpresas;
  iconClass = FontAwesome.listaEmpresa;
  novo = Botoes.novoEmpresa;
  modalRef?: BsModalRef;
  message?: string;
  public loginUsuario!: Login;
  public empresas: Empresa[] = [];
  private _empresaListada = '';
  empresasFiltrados: Empresa[] = [];
  empresaNome!: string;
  empresaId!: number;
  visualizarEditar!:boolean;
  visualizarDetalhe!:boolean;
  visualizarExcluir!:boolean;

  public get empresaLista():string{
    return this._empresaListada;
  }

  public set empresaLista(value:string){
    this._empresaListada = value;
    this.empresasFiltrados = this.empresaLista ? this.filtrarEmpresas(this.empresaLista) : this.empresas;
  }

  public filtrarEmpresas(filtrarPor:string):Empresa[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.empresas.filter(
      (empresa:any) => empresa.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }

  constructor(private router: Router, private authService: AuthService, public titu: TituloService, public nav: NavService, private empresaService: EmpresaService, private modalService: BsModalService, private spinner: NgxSpinnerService, private _changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getEmpresas();
  }

  public getEmpresas(): void{
    this.empresaService.getEmpresas().subscribe(
      (_empresas: Empresa[]) => {
        this.empresas = _empresas;
        this.empresasFiltrados = this.empresas;
      },
      error => console.log(error)
    );
  }

  editar(id: number): void {
    this.router.navigate([`empresas/editar/${id}`]);
  }

  detalhe(id: number): void {
    this.router.navigate([`empresas/detalhe/${id}`]);
  }

  openModal(event: any, template: TemplateRef<any>, empresaNome: string, empresaId: number): void {
    event.stopPropagation();
    this.empresaNome = empresaNome;
    this.empresaId = empresaId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.empresaService.delete(this.empresaId).subscribe(
      (result: any) =>{
        console.log(result.message);
          this.toastr.success(result.message);
          this.spinner.hide();
          this.getEmpresas();
          this.empresas = this.empresas.filter(e => e.id !== this.empresaId);
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
    console.log(validar[0]);
  }

}
