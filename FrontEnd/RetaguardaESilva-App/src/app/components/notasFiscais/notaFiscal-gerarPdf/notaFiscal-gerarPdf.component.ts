import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
import { coerceBooleanProperty } from '@angular/cdk/coercion';

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
  notaFiscalEmissaoExiste!: boolean;
  exclusao: boolean = false;
  constructor(private notaFiscalService: NotaFiscalService, private route: ActivatedRoute, private router: Router, private authService: AuthService, public nav: NavService,public titu: TituloService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.criarPDF();
    this.gerarPDF(this.notaFiscalEmissaoExiste);
  }

  public criarPDF(): void{
    this._changeDetectorRef.markForCheck();
    this.notaFiscalId = this.route.snapshot.params['id'];
    this.notaFiscalEmissaoExiste = coerceBooleanProperty(this.route.snapshot.paramMap.get('notaFiscalEmissaoExiste'));
    this.exclusao = coerceBooleanProperty(this.route.snapshot.paramMap.get('exclusao'));
    this.notaFiscalService.GerarPdf(this.notaFiscalId, false, false).subscribe(
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

  public gerarPDF(notaFiscalEmissaoExiste:boolean) {
    this._changeDetectorRef.markForCheck();
    setTimeout(() => {
      html2canvas(document.body).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4');
        var width = pdf.internal.pageSize.getWidth();
        var height = canvas.height * width / canvas.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
        if(this.notaFiscalEmissaoExiste == true && this.exclusao == true){
          pdf.save('Nota Fiscal ' + this.notaFiscalId + ' cancelada' +'.pdf');
        }else{
          pdf.save('Nota Fiscal ' + this.notaFiscalId + '.pdf');
        }
      });
      if(notaFiscalEmissaoExiste == true){
        if(this.notaFiscalEmissaoExiste == true || this.exclusao == true){
          this.notaFiscalService.GerarPdf(this.notaFiscalId, this.notaFiscalEmissaoExiste, this.exclusao).subscribe(
            (_notaFiscal: NotaFiscal) => {});
        }
      }
      this.Voltar();
    }, 1000);
     // 100 milissegundos de atraso
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
