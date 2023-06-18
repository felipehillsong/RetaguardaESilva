import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { statusNotaFiscal } from 'src/app/enums/StatusNotaFiscal.enum';
import { Botoes } from 'src/app/enums/botoes';
import { FontAwesome } from 'src/app/enums/fontAwesome';
import { Titulos } from 'src/app/enums/titulos';
import { NotaFiscal } from 'src/app/models/notaFiscal';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { NotaFiscalService } from 'src/app/services/notaFiscal/notaFiscal.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-notaFiscal-lista',
  templateUrl: './notaFiscal-lista.component.html',
  styleUrls: ['./notaFiscal-lista.component.scss']
})
export class NotaFiscalListaComponent implements OnInit {
  titulo =  Titulos.listaNotaFiscal;
  iconClass = FontAwesome.listaNotaFiscal;
  modalRef?: BsModalRef;
  message?: string;
  public notasFiscais: NotaFiscal[] = [];
  notasFiscaisFiltradas: NotaFiscal[] = [];
  notaFiscal = {} as NotaFiscal;
  private _notaFiscalListada = '';
  fornecedorNome!: string;
  notaFiscalId!: number;
  clienteNome!:string;
  notaFiscalEmissaoExiste:boolean = false;
  visualizarGerarPDF!: boolean;
  visualizarCancelar!: boolean;
  notaFiscalAprovada: number = statusNotaFiscal.NotaFiscalAprovada;
  notaFiscalCancelada: number = statusNotaFiscal.NotaFiscalCancelada;

  public get notaFiscalLista():string{
    return this._notaFiscalListada;
  }

  public set notaFiscalLista(value:string){
    this._notaFiscalListada = value;
    this.notasFiscaisFiltradas = this.notaFiscalLista ? this.filtrarNomeNotaFiscal(this.notaFiscalLista) : this.notasFiscais;
  }

  public filtrarNomeNotaFiscal(filtrarPor:string):NotaFiscal[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.notasFiscais.filter(
      (notaFiscal:any) => notaFiscal.nomeCliente.toLocaleLowerCase().indexOf(filtrarPor) !== -1 || notaFiscal.id.toString().indexOf(filtrarPor) !== -1);
  }

  constructor(private router: Router, private notaFiscalService: NotaFiscalService, private authService: AuthService, public titu: TituloService, public nav: NavService, private modalService: BsModalService, private spinner: NgxSpinnerService, private toastr: ToastrService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getNotasFiscais();
  }

  public getNotasFiscais(): void{
    this.notaFiscalService.getNotasFiscais(this.authService.empresaId()).subscribe(
      (_notasFiscais: NotaFiscal[]) => {
        this.notasFiscais = _notasFiscais;
        this.notasFiscaisFiltradas = this.notasFiscais;
      },
      error => console.log(error)
    );
  }

  gerarPDF(id: number): void {
    this.router.navigate([`notasFiscais/pdf`, id, this.notaFiscalEmissaoExiste]);
  }

  openModal(event: any, template: TemplateRef<any>, clienteNome: string, notaFiscalId: number): void {
    event.stopPropagation();
    this.clienteNome = clienteNome;
    this.notaFiscalId = notaFiscalId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.notaFiscalService.cancelar(this.notaFiscalId).subscribe(
      (result: any) =>{
        console.log(result.message);
          this.toastr.success(result.message);
          this.spinner.hide();
          this.getNotasFiscais();
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
    this.visualizarGerarPDF = validar[0];
    this.visualizarCancelar = validar[1];
  }


}
