import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Titulos } from 'src/app/enums/titulos';
import { Transportador } from 'src/app/models/transportador';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';
import { TransportadorService } from 'src/app/services/transportador/transportador.service';

@Component({
  selector: 'app-transportador-detalhe',
  templateUrl: './transportador-detalhe.component.html',
  styleUrls: ['./transportador-detalhe.component.scss'],
  providers: [DatePipe]
})
export class TransportadorDetalheComponent implements OnInit {
  titulo =  Titulos.detalheTransportador;
  transportador = {} as Transportador;
  transportadorId!: number;
  cep!:string;
  ativo!:string;

  constructor(private router: Router, private authService: AuthService, public titu: TituloService, private route: ActivatedRoute, private transportadorService: TransportadorService, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getTransportadorById();
  }

  public getTransportadorById(): void{
    this.transportadorId = this.route.snapshot.params['id'];
    this.transportadorService.getTransportadorById(this.transportadorId).subscribe(
      (_transportador: Transportador) => {
        this.transportador = _transportador;
        this.preencherSelect();
        var dataBD = moment(this.transportador.dataCadastroTransportador).format('YYYY-MM-DD');
        this.transportador.dataCadastroTransportador = dataBD;
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public preencherSelect(){
    if(this.transportador.ativo == true){
      this.ativo = 'Ativo';
      return [
        { id: '0', name: 'Inativo' },
        { id: '1', name: this.ativo }
      ];
    }else if(this.transportador.ativo == false){
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
    this.router.navigate(['transportadores/lista']);
  }

  isTelefone(): boolean{
    return this.transportador.telefone == null ? true : this.transportador.telefone.length < 12 ? true : false;
  }

 getTelefoneMask(): string{
    return this.isTelefone() ? '99 9999-99999' : '(99) 99999-9999';
  }

  somenteNumeros(e: any):boolean {
    let charCode = e.charCode ? e.charCode : e.keyCode;
    // charCode 8 = backspace
    // charCode 9 = tab

    if (charCode != 8 && charCode != 9) {
      // charCode 48 equivale a 0
      // charCode 57 equivale a 9
      let max = 10;

      if ((charCode < 48 || charCode > 57)||(e.target.value.length >= max)) return false;
    }
    return true;
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
