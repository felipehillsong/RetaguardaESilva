import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Botoes } from 'src/app/enums/botoes';
import { FontAwesome } from 'src/app/enums/fontAwesome';
import { Titulos } from 'src/app/enums/titulos';
import { EnderecoProduto } from 'src/app/models/enderecoProduto';
import { Estoque } from 'src/app/models/estoque';
import { EstoqueService } from 'src/app/services/estoque/estoque.service';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-enderecoProduto-lista',
  templateUrl: './enderecoProduto-lista.component.html',
  styleUrls: ['./enderecoProduto-lista.component.scss']
})
export class EnderecoProdutoListaComponent implements OnInit {
  titulo =  Titulos.listaEndrecoProduto;
  iconClass = FontAwesome.listaEnderecoProduto;
  public enderecosProdutos: EnderecoProduto[] = [];
  enderecoProduto = {} as EnderecoProduto;
  enderecosProdutosFiltrados: EnderecoProduto[] = [];
  public estoques: Estoque[] = [];
  private _enderecoProdutoListado = '';
  enderecoProdutoId!:number;

  public get enderecoProdutoLista():string{
    return this._enderecoProdutoListado;
  }

  public set enderecoProdutoLista(value:string){
    this._enderecoProdutoListado = value;
    this.enderecosProdutosFiltrados = this.enderecoProdutoLista ? this.filtrarEnderecosProdutos(this.enderecoProdutoLista) : this.enderecosProdutos;
  }

  public filtrarEnderecosProdutos(filtrarPor:string):EnderecoProduto[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.enderecosProdutos.filter(
      (estoque:any) => estoque.nomeEndereco.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }

  constructor(private router: Router, private route: ActivatedRoute, public titu: TituloService, private fb: FormBuilder, private estoqueService: EstoqueService, private toastr: ToastrService, private spinner: NgxSpinnerService, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getEnderecoProduto();
  }

  public getEnderecoProduto(): void{
    this.estoqueService.getEnderecoProduto(this.authService.empresaId()).subscribe(
      (_enderecoProduto: EnderecoProduto[]) => {
        this.enderecosProdutos = _enderecoProduto;
        this.PreencherAtivo(this.enderecosProdutos);
        this.enderecosProdutosFiltrados = this.enderecosProdutos;
      },
      error => console.log(error)
    );
  }

  public PreencherAtivo(ativo:EnderecoProduto[]):void{
    for(var i = 0; i < ativo.length; i++){
      if(ativo[i].ativo == true){
        this.enderecosProdutos[i].ativoView = 'Ativo';
      }else{
        this.enderecosProdutos[i].ativoView = 'Inativo';
      }
    }
  }

  public Voltar(){
    this.router.navigate(['estoques/lista']);
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
    this.titu.show();
    this.titu.hideTitulo();
  }

}
