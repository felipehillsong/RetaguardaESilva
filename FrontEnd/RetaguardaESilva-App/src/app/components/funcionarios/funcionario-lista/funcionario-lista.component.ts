import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Botoes } from 'src/app/enums/botoes';
import { FontAwesome } from 'src/app/enums/fontAwesome';
import { Titulos } from 'src/app/enums/titulos';
import { Funcionario } from 'src/app/models/funcionario';
import { AuthService } from 'src/app/services/login/auth.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-funcionario-lista',
  templateUrl: './funcionario-lista.component.html',
  styleUrls: ['./funcionario-lista.component.scss']
})
export class FuncionarioListaComponent implements OnInit {
  titulo =  Titulos.listaFuncionarios;
  iconClass = FontAwesome.listaFuncionario;
  novo = Botoes.novoFuncionario;
  modalRef?: BsModalRef;
  message?: string;
  public funcionarios: Funcionario[] = [];
  funcionariosFiltrados: Funcionario[] = [];
  private _funcionarioListado = '';
  funcionarioNome!: string;
  funcionarioId!: number;
  visualizarEditar!:boolean;
  visualizarDetalhe!:boolean;
  visualizarExcluir!:boolean;


  public get funcionarioLista():string{
    return this._funcionarioListado;
  }

  public set funcionarioLista(value:string){
    this._funcionarioListado = value;
    this.funcionariosFiltrados = this.funcionarioLista ? this.filtrarFuncionarios(this.funcionarioLista) : this.funcionarios;
  }

  public filtrarFuncionarios(filtrarPor:string):Funcionario[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.funcionarios.filter(
      (funcionario:any) => funcionario.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }

  constructor(private router: Router, public titu: TituloService, private funcionarioService: FuncionarioService, public nav: NavService, private authService: AuthService, private modalService: BsModalService, private spinner: NgxSpinnerService, private toastr: ToastrService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.permissoesDeTela();
    this.getFuncionarios();
  }

  public getFuncionarios(): void{
    this.funcionarioService.getFuncionarios(this.authService.empresaId()).subscribe(
      (_funcionarios: Funcionario[]) => {
        this.funcionarios = _funcionarios;
        this.funcionariosFiltrados = this.funcionarios;
      },
      error => console.log(error)
    );
  }

  editar(id: number): void {
    this.router.navigate([`funcionarios/editar/${id}`]);
  }

  detalhe(id: number): void {
    this.router.navigate([`funcionarios/detalhe/${id}`]);
  }

  openModal(event: any, template: TemplateRef<any>, funcionarioNome: string, funcionarioId: number): void {
    event.stopPropagation();
    this.funcionarioNome = funcionarioNome;
    this.funcionarioId = funcionarioId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.funcionarioService.delete(this.funcionarioId).subscribe(
      (result: any) =>{
        console.log(result.message);
          this.toastr.success(result.message);
          this.spinner.hide();
          this.getFuncionarios();
          this.funcionarios = this.funcionarios.filter(f => f.id !== this.funcionarioId);
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
