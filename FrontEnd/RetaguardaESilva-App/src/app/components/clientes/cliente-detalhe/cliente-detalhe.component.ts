import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Titulos } from 'src/app/enums/titulos';
import { Cliente } from 'src/app/models/cliente';
import { AuthService } from 'src/app/services/login/auth.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.scss']
})
export class ClienteDetalheComponent implements OnInit {
  titulo =  Titulos.detalheCliente;
  cliente = {} as Cliente;
  clienteId!: number;
  activatedRouter: any;
  ativo!:string;

  constructor(public nav: NavService, public titu: TituloService, private authService: AuthService, private _changeDetectorRef: ChangeDetectorRef, private clienteService: ClienteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getClienteById();
  }

  public getClienteById(): void{
    this.clienteId = this.route.snapshot.params['id'];
    this.clienteService.getClientesById(this.clienteId).subscribe(
      (_cliente: Cliente) => {
        this.cliente = _cliente;
        this.preencherSelect();
        var dataBD = moment(this.cliente.dataCadastroCliente).format('YYYY-MM-DD');
        this.cliente.dataCadastroCliente = dataBD;
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public preencherSelect(){
    if(this.cliente.ativo == true){
      this.ativo = 'Ativo';
      return [
        { id: '0', name: 'Inativo' },
        { id: '1', name: this.ativo }
      ];
    }else if(this.cliente.ativo == false){
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

  isCPF(): boolean{
    return this.cliente.cpfcnpj == null ? true : this.cliente.cpfcnpj.length < 12 ? true : false;
  }

 getCpfCnpjMask(): string{
    return this.isCPF() ? '000.000.000-009' : '00.000.000/0000-00';
  }

  isTelefone(): boolean{
    return this.cliente.telefone == null ? true : this.cliente.telefone.length < 12 ? true : false;
  }

 getTelefoneMask(): string{
    return this.isTelefone() ? '99 9999-99999' : '(99) 99999-9999';
  }

  public Voltar(){
    this.router.navigate(['clientes/lista']);
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
