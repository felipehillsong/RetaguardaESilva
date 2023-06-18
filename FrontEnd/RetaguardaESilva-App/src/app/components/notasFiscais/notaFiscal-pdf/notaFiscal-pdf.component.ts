import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Empresa } from 'src/app/models/empresa';
import { NotaFiscal } from 'src/app/models/notaFiscal';
import { Produto } from 'src/app/models/produto';
import { Transportador } from 'src/app/models/transportador';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { NotaFiscalService } from 'src/app/services/notaFiscal/notaFiscal.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-notaFiscal-pdf',
  templateUrl: './notaFiscal-pdf.component.html',
  styleUrls: ['./notaFiscal-pdf.component.scss']
})
export class NotaFiscalPdfComponent implements OnInit {
  @ViewChild('content', {static: false}) el!: ElementRef;
  notaFiscal = {} as NotaFiscal;
  empresa = {} as Empresa;
  cliente = {} as Cliente;
  transportador = {} as Transportador;
  produtos: Produto[] = [];
  notaFiscalId!: number;
  botaoVolta: boolean = false;
  botaoImprimir: boolean = false;
  notaFiscalEmissaoExiste: boolean = false;
  constructor(private notaFiscalService: NotaFiscalService, private route: ActivatedRoute, private router: Router, private authService: AuthService, public nav: NavService,public titu: TituloService) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.visualizarPDF();
  }

  public visualizarPDF(): void{
    this.notaFiscalId = this.route.snapshot.params['id'];
    this.notaFiscalEmissaoExiste = Boolean(this.route.snapshot.params['notaFiscalEmissaoExiste']);
    this.notaFiscalService.GerarPdf(this.notaFiscalId, false).subscribe(
      (_notaFiscal: NotaFiscal) => {
        if(this.notaFiscalEmissaoExiste == true){
          this.gerarPDF(this.notaFiscalId);
        }
        this.notaFiscal = _notaFiscal;
        this.empresa = this.notaFiscal.empresa;
        this.cliente = this.notaFiscal.cliente;
        this.transportador = this.notaFiscal.transportador;
        this.produtos = this.notaFiscal.produto;
        this.botaoVolta = true;
        this.botaoImprimir = true;
      },
      error => console.log(error)
    );
  }

  gerarPDF(id: number): void {
    this.router.navigate([`notasFiscais/gerarPdf`, id, this.notaFiscalEmissaoExiste]);
  }

  public Voltar(){
    this.router.navigate(['notasFiscais/lista']);
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
  }

}
