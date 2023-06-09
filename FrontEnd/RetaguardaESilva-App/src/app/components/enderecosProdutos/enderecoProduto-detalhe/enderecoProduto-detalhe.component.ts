import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Titulos } from 'src/app/enums/titulos';
import { EnderecoProduto } from 'src/app/models/enderecoProduto';
import { Estoque } from 'src/app/models/estoque';
import { EstoqueService } from 'src/app/services/estoque/estoque.service';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-enderecoProduto-detalhe',
  templateUrl: './enderecoProduto-detalhe.component.html',
  styleUrls: ['./enderecoProduto-detalhe.component.scss']
})
export class EnderecoProdutoDetalheComponent implements OnInit {
  titulo =  Titulos.detalheEnderecoProduto;
  enderecoProduto = {} as EnderecoProduto;
  estoque = {} as Estoque;
  enderecoProdutoId!:number;
  ativo!:string;

  constructor(private router: Router, private route: ActivatedRoute, public titu: TituloService, private fb: FormBuilder, private estoqueService: EstoqueService, private toastr: ToastrService, private spinner: NgxSpinnerService, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getEnderecoProdutoById()
  }

  public getEnderecoProdutoById(): void{
    this.enderecoProdutoId = this.route.snapshot.params['id'];
    this.estoqueService.getEnderecoProdutoById(this.enderecoProdutoId).subscribe(
      (_enderecoProduto: EnderecoProduto) => {
        this.enderecoProduto = _enderecoProduto;
        this.preencherSelect();
        var dataBD = moment(this.enderecoProduto.dataCadastroEnderecoProduto).format('YYYY-MM-DD');
        this.enderecoProduto.dataCadastroEnderecoProduto = dataBD;
        this._changeDetectorRef.markForCheck();
        this.estoqueService.getEstoquesById(this.enderecoProduto.estoqueId).subscribe(
          (_estoque: Estoque) => {
            this.estoque = _estoque;
            this._changeDetectorRef.markForCheck();
          },
          error => console.log(error)
        );
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public preencherSelect(){
    if(this.enderecoProduto.ativo == true){
      this.ativo = 'Ativo';
      return [
        { id: '0', name: 'Inativo' },
        { id: '1', name: this.ativo }
      ];
    }else if(this.enderecoProduto.ativo == false){
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
    this.titu.hide();
    this.titu.showTitulo();
  }

}
