import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Titulos } from 'src/app/enums/titulos';
import { Cep } from 'src/app/models/cep';
import { Funcionario } from 'src/app/models/funcionario';
import { AuthService } from 'src/app/services/login/auth.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-funcionario-detalhe',
  templateUrl: './funcionario-detalhe.component.html',
  styleUrls: ['./funcionario-detalhe.component.scss'],
  providers: [DatePipe]
})
export class FuncionarioDetalheComponent implements OnInit {
  titulo =  Titulos.detalheFuncionario;
  form!: FormGroup;
  funcionario = {} as Funcionario;
  dataHoje!:string;
  cep!:string;
  cepBD = {} as Cep;
  keyError!:string;
  valueError!:string;
  funcionarioId!: number;
  ativo!:string;

  constructor(private router: Router, public titu: TituloService, private authService: AuthService, private funcionarioService: FuncionarioService, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getFuncionarioById();
  }

  public getFuncionarioById(): void{
    this.funcionarioId = this.route.snapshot.params['id'];
    this.funcionarioService.getFuncionarioById(this.funcionarioId).subscribe(
      (_funcionario: Funcionario) => {
        this.funcionario = _funcionario;
        this.preencherSelect();
        var dataBD = moment(this.funcionario.dataCadastroFuncionario).format('YYYY-MM-DD');
        this.funcionario.dataCadastroFuncionario = dataBD;
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public preencherSelect(){
    if(this.funcionario.ativo == true){
      this.ativo = 'Ativo';
      return [
        { id: '0', name: 'Inativo' },
        { id: '1', name: this.ativo }
      ];
    }else if(this.funcionario.ativo == false){
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
    this.router.navigate(['funcionarios/lista']);
  }

  isTelefone(): boolean{
    return this.funcionario.telefone == null ? true : this.funcionario.telefone.length < 12 ? true : false;
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
