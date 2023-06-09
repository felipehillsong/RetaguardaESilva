import {ChangeDetectorRef, Component, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { Titulos } from 'src/app/enums/titulos';
import { Login } from 'src/app/models/login';
import { Pedido } from 'src/app/models/pedido';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';
import { _MatOptionBase } from '@angular/material/core';
import { MensagensAlerta } from 'src/app/enums/mensagensAlerta';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { TransportadorService } from 'src/app/services/transportador/transportador.service';
import { Transportador } from 'src/app/models/transportador';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { Produto } from 'src/app/models/produto';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StatusPedido } from 'src/app/enums/statusPedido';
import { NotaFiscal } from 'src/app/models/notaFiscal';
import { NotaFiscalService } from 'src/app/services/notaFiscal/notaFiscal.service';

@Component({
  selector: 'app-pedido-detalhe',
  templateUrl: './pedido-detalhe.component.html',
  styleUrls: ['./pedido-detalhe.component.scss']
})
export class PedidoDetalheComponent implements OnInit {
  titulo =  Titulos.detalhePedidos;
  pedido = {} as Pedido;
  notaFiscalPedido = {} as NotaFiscal;
  pedidoId!:number;
  constructor(private router: Router, private route: ActivatedRoute, public titu: TituloService, private notaFiscalService: NotaFiscalService, private pedidoService: PedidoService, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getPedidoById();
  }

  public getPedidoById(): void{
    this.pedidoId = parseInt(this.route.snapshot.params['id']);
    this.pedidoService.getPedidoById(this.pedidoId).subscribe(
      (_pedido: Pedido) => {
        this.pedido = _pedido;
        this.getNotaFiscalPedidoById();
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public getNotaFiscalPedidoById(): void{
    this.notaFiscalService.GetNotaFiscalPedidoById(this.pedidoId).subscribe(
      (_notaFiscal: NotaFiscal) => {
        this.notaFiscalPedido = _notaFiscal;
        this.preencherNotaExistente(this.notaFiscalPedido.pedidoId);
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public preencherNotaExistente(pedidoId:number){
    if(pedidoId){
      this.pedido.possuiNotaFiscal = true;
    }
  }

  public Voltar(){
    this.router.navigate(['pedidos/lista']);
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
