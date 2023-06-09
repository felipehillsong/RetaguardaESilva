import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Titulos } from 'src/app/enums/titulos';
import { Empresa } from 'src/app/models/empresa';
import { AuthService } from 'src/app/services/login/auth.service';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-empresa-detalhe',
  templateUrl: './empresa-detalhe.component.html',
  styleUrls: ['./empresa-detalhe.component.scss'],
  providers: [DatePipe]
})
export class EmpresaDetalheComponent implements OnInit {
  titulo =  Titulos.detalheEmpresa;
  empresa = {} as Empresa;
  empresaId!: number;
  cep!:string;
  ativo!:string;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, public titu: TituloService, private empresaService: EmpresaService, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getEmpresaById();
  }

  public getEmpresaById(): void{
    this.empresaId = this.route.snapshot.params['id'];
    this.empresaService.getEmpresasById(this.empresaId).subscribe(
      (_empresa: Empresa) => {
        this.empresa = _empresa;
        this.preencherSelect();
        var dataBD = moment(this.empresa.dataCadastroEmpresa).format('YYYY-MM-DD');
        this.empresa.dataCadastroEmpresa = dataBD;
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public preencherSelect(){
    if(this.empresa.ativo == true){
      this.ativo = 'Ativo';
      return [
        { id: '0', name: 'Inativo' },
        { id: '1', name: this.ativo }
      ];
    }else if(this.empresa.ativo == false){
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
    this.router.navigate(['empresas/lista']);
  }

  isTelefone(): boolean{
    return this.empresa.telefone == null ? true : this.empresa.telefone.length < 12 ? true : false;
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
