import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
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
  selector: 'app-notaFiscal-gerarPdf',
  templateUrl: './notaFiscal-gerarPdf.component.html',
  styleUrls: ['./notaFiscal-gerarPdf.component.scss']
})
export class NotaFiscalGerarPdfComponent implements OnInit {
  @ViewChild('content', {static: false}) el!: ElementRef;
  notaFiscal = {} as NotaFiscal;
  empresa = {} as Empresa;
  cliente = {} as Cliente;
  transportador = {} as Transportador;
  produtos: Produto[] = [];
  notaFiscalId!: number;

  constructor(private notaFiscalService: NotaFiscalService, private route: ActivatedRoute, private router: Router, private authService: AuthService, public nav: NavService,public titu: TituloService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.criarPDF();
    this.gerarPDF();
  }

  public criarPDF(): void{
    this._changeDetectorRef.markForCheck();
    this.notaFiscalId = this.route.snapshot.params['id'];
    this.notaFiscalService.GerarPdf(this.notaFiscalId).subscribe(
      (_notaFiscal: NotaFiscal) => {
        this.notaFiscal = _notaFiscal;
        this.empresa = this.notaFiscal.empresa;
        this.cliente = this.notaFiscal.cliente;
        this.transportador = this.notaFiscal.transportador;
        this.produtos = this.notaFiscal.produto;
      },
      error => console.log(error)
    );
    this._changeDetectorRef.markForCheck();
  }

  public gerarPDF() {
    this._changeDetectorRef.markForCheck();
    setTimeout(() => {
      html2canvas(document.body).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4');
        var width = pdf.internal.pageSize.getWidth();
        var height = canvas.height * width / canvas.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
        pdf.save('Nota Fiscal ' + this.notaFiscalId + '.pdf');
      });
      this.Voltar();
    }, 100); // 100 milissegundos de atraso
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
    this.titu.hide();
    this.titu.hideTitulo();
  }

}
