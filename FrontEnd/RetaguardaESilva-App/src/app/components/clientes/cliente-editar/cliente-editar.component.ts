import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cep } from 'src/app/models/cep';
import { Cliente } from 'src/app/models/cliente';
import { AuthService } from 'src/app/services/login/auth.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { NavService } from 'src/app/services/nav/nav.service';
import * as moment from 'moment';
import { Titulos } from 'src/app/enums/titulos';
import { TituloService } from 'src/app/services/titulo/titulo.service';
import { BuscarCepService } from 'src/app/services/buscarCep/buscarCep.service';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClienteEditarComponent implements OnInit {
  titulo =  Titulos.editarcliente;
  cliente = {} as Cliente;
  clienteId!: number;
  activatedRouter: any;
  form!: FormGroup;
  dataHoje!:string;
  cep!:string;
  cepBD = {} as Cep;
  keyError!:string;
  valueError!:string;
  ativo!:string;

  constructor(private fb: FormBuilder, public titu: TituloService, private _changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService, private spinner: NgxSpinnerService, public nav: NavService, private clienteService: ClienteService, private authService: AuthService, private router: Router, private route: ActivatedRoute, private buscarCep: BuscarCepService) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getClienteById();
    this.validation();
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

  public preencherAtivo(forms:any){
    if(forms.ativo == "Ativo"){
      this.cliente.ativo = true;
    }
    else{
      this.cliente.ativo = false;
    }
  }

  public Editar(): void {
    this.spinner.show();
    if(this.form.valid){
      this.cliente = {...this.form.value};
      this.cliente.id = this.clienteId;
      this.preencherAtivo(this.form.value);
      this.cliente.empresaId = this.authService.empresaId();
      this.clienteService.editCliente(this.cliente).subscribe(() => {
        this.router.navigate(['clientes/lista']);
      },
      (error: any) => {
        console.error(error);
        this.spinner.hide();
        this.toastr.error(error.error);
      },
      () => this.spinner.hide()
    );
  }
}

  public validation(): void {
    this.form = this.fb.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      logradouro: [null, Validators.required],
      bairro: [null, Validators.required],
      localidade: [null, Validators.required],
      numero: [null, Validators.required],
      cep: [null, Validators.required],
      complemento: [null],
      uf: [null, Validators.required],
      pais: [null],
      telefone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      cpfcnpj: [null, Validators.required],
      inscricaoMunicipal: [null],
      inscricaoEstadual: [null],
      dataCadastroCliente: [null, Validators.required],
      ativo: [null, Validators.required]
    });
  }

  get f(): any {
    return this.form.controls;
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public Voltar(){
    this.router.navigate(['clientes/lista']);
  }

  EnviarCep(cepView: string): void {
    this.buscarCep.buscarCep(cepView).subscribe(
      (_cepBD: any) => {
        this.cepBD = _cepBD;
        console.log(_cepBD);
        Object.entries(this.cepBD).forEach(([key, value]) => {
          this.form.get(key.toLowerCase())?.setValue(value);
          this.form.get('pais')?.setValue('Brasil');
      });
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
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
