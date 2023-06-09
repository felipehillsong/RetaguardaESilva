import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IdFornecedorZerado } from 'src/app/enums/IdFornecedorZerado.enum';
import { Titulos } from 'src/app/enums/titulos';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Produto } from 'src/app/models/produto';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.scss']
})
export class ProdutoDetalheComponent implements OnInit {
  titulo =  Titulos.detalheProduto;
  form!: FormGroup;
  produto = {} as Produto;
  public fornecedores: Fornecedor[] = [];
  fornecedorId!:number;
  fornecedorNome!:string;
  produtoId!:number;
  dataHoje!:string;
  keyError!:string;
  valueError!:string;
  ativo!:string;
  temFornecedor:boolean = true;
  semFornecedor:boolean = true;
  nomeFornecedor!:String;

  constructor(private router: Router, private route: ActivatedRoute,  public titu: TituloService, private fb: FormBuilder, private produtoService: ProdutoService, private toastr: ToastrService, private spinner: NgxSpinnerService, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getProdutoById();
  }

  public getProdutoById(): void{
    this.produtoId = this.route.snapshot.params['id'];
    this.produtoService.getProdutosById(this.produtoId).subscribe(
      (_produto: Produto) => {
        this.produto = _produto;
        this.preencherSelect();
        var dataBD = moment(this.produto.dataCadastroProduto).format('YYYY-MM-DD');
        this.produto.dataCadastroProduto = dataBD;
        var precoCompra = this.produto.precoCompra.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        this.produto.precoCompraFormatado = precoCompra;
        var precoVenda = this.produto.precoVenda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        this.produto.precoVendaFormatado = precoVenda;
        this.getFornecedores();
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }


  public getFornecedores(): void{
        if(this.produto.fornecedorId != IdFornecedorZerado.FornecedorDeletado){
          this.produtoService.getFornecedorById(this.produto.fornecedorId).subscribe(
            (_fornecedor: Fornecedor) => {
              this.nomeFornecedor = _fornecedor.nome;
              this._changeDetectorRef.markForCheck();
            },
            error => console.log(error)
            );
        }else if(this.produto.fornecedorId == IdFornecedorZerado.FornecedorDeletado){
          this.temFornecedor = false;
          this.semFornecedor = true;
          this.nomeFornecedor = IdFornecedorZerado.SemFornecedor;
          this._changeDetectorRef.markForCheck();
        }
        this._changeDetectorRef.markForCheck();
  }


  public preencherSelect(){
    if(this.produto.ativo == true){
      this.ativo = 'Ativo';
      return [
        { id: '0', name: 'Inativo' },
        { id: '1', name: this.ativo }
      ];
    }else if(this.produto.ativo == false){
      this.ativo = 'Inativo';
      return [
        { id: '0', name: this.ativo },
        { id: '1', name: 'Ativo' },
      ];
    }else{
      return [
        { id: '0', name: 'Error' },
        { id: '1', name: 'Error' },
      ];
    }
  }

  public Voltar(){
    this.router.navigate(['produtos/lista']);
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
    this.titu.hide();
    this.titu.showTitulo();
  }

}
