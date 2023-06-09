import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Botoes } from 'src/app/enums/botoes';
import { FontAwesome } from 'src/app/enums/fontAwesome';
import { Titulos } from 'src/app/enums/titulos';
import { Login } from 'src/app/models/login';
import { Transportador } from 'src/app/models/transportador';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';
import { TransportadorService } from 'src/app/services/transportador/transportador.service';

@Component({
  selector: 'app-transportador-lista',
  templateUrl: './transportador-lista.component.html',
  styleUrls: ['./transportador-lista.component.scss']
})
export class TransportadorListaComponent implements OnInit {
  titulo =  Titulos.listaTransportadores;
  iconClass = FontAwesome.listaTransportador;
  novo = Botoes.novoTransportador;
  modalRef?: BsModalRef;
  message?: string;
  public loginUsuario!: Login;
  public transportadores: Transportador[] = [];
  transportadoresFiltrados: Transportador[] = [];
  private _transportadorListado = '';
  transportadorNome!: string;
  transportadorId!: number;
  visualizarEditar!:boolean;
  visualizarDetalhe!:boolean;
  visualizarExcluir!:boolean;

  public get transportadorLista():string{
    return this._transportadorListado;
  }

  public set transportadorLista(value:string){
    this._transportadorListado = value;
    this.transportadoresFiltrados = this.transportadorLista ? this.filtrarTransportadores(this.transportadorLista) : this.transportadores;
  }

  public filtrarTransportadores(filtrarPor:string):Transportador[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.transportadores.filter(
      (fornecedor:any) => fornecedor.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }


  constructor(private router: Router, public titu: TituloService, private transportadorService: TransportadorService, public nav: NavService, private authService: AuthService, private modalService: BsModalService, private spinner: NgxSpinnerService, private toastr: ToastrService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.permissoesDeTela();
    this.getTransportadores();
  }

  public getTransportadores(): void{
    this.transportadorService.getTransportadores(this.authService.empresaId()).subscribe(
      (_transportadores: Transportador[]) => {
        this.transportadores = _transportadores;
        this.transportadoresFiltrados = this.transportadores;
      },
      error => console.log(error)
    );
  }

  editar(id: number): void {
    this.router.navigate([`transportadores/editar/${id}`]);
  }

  detalhe(id: number): void {
    this.router.navigate([`transportadores/detalhe/${id}`]);
  }

  openModal(event: any, template: TemplateRef<any>, transportadorNome: string, transportadorId: number): void {
    event.stopPropagation();
    this.transportadorNome = transportadorNome;
    this.transportadorId = transportadorId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.transportadorService.delete(this.transportadorId).subscribe(
      (result: any) =>{
        console.log(result.message);
          this.toastr.success(result.message);
          this.spinner.hide();
          this.getTransportadores();
          this.transportadores = this.transportadores.filter(t => t.id !== this.transportadorId);
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

