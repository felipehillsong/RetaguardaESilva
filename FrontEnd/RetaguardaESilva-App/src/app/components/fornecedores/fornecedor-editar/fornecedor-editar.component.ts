import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Titulos } from 'src/app/enums/titulos';
import { Cep } from 'src/app/models/cep';
import { Fornecedor } from 'src/app/models/fornecedor';
import { AuthService } from 'src/app/services/login/auth.service';
import { FornecedorService } from 'src/app/services/fornecedor/fornecedor.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';
import { BuscarCepService } from 'src/app/services/buscarCep/buscarCep.service';

@Component({
  selector: 'app-fornecedor-editar',
  templateUrl: './fornecedor-editar.component.html',
  styleUrls: ['./fornecedor-editar.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FornecedorEditarComponent implements OnInit {
  titulo =  Titulos.editarFornecedor;
  form!: FormGroup;
  fornecedor = {} as Fornecedor;
  dataHoje!:string;
  cep!:string;
  cepBD = {} as Cep;
  keyError!:string;
  valueError!:string;
  ativo!:string;
  fornecedorId!: number;

  constructor(private router: Router, public titu: TituloService, private fb: FormBuilder, private fornecedorService: FornecedorService, private toastr: ToastrService, private spinner: NgxSpinnerService, private datePipe: DatePipe, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService, private route: ActivatedRoute, private buscarCep: BuscarCepService) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getFornecedorById();
    this.validation();
  }

  public getFornecedorById(): void{
    this.fornecedorId = this.route.snapshot.params['id'];
    this.fornecedorService.getFornecedorById(this.fornecedorId).subscribe(
      (_fornecedor: Fornecedor) => {
        this.fornecedor = _fornecedor;
        this.preencherSelect();
        var dataBD = moment(this.fornecedor.dataCadastroFornecedor).format('YYYY-MM-DD');
        this.fornecedor.dataCadastroFornecedor = dataBD;
        this._changeDetectorRef.markForCheck();
        console.log(this.fornecedor);
      },
      error => console.log(error)
    );
  }

  public preencherSelect(){
    if(this.fornecedor.ativo == true){
      this.ativo = 'Ativo';
      return [
        { id: '0', name: 'Inativo' },
        { id: '1', name: this.ativo }
      ];
    }else if(this.fornecedor.ativo == false){
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
      this.fornecedor.ativo = true;
    }
    else{
      this.fornecedor.ativo = false;
    }
  }

  public Editar(): void {
    this.spinner.show();
    if(this.form.valid){
      this.fornecedor = {...this.form.value};
      this.fornecedor.id = this.fornecedorId;
      this.preencherAtivo(this.form.value);
      this.fornecedor.empresaId = this.authService.empresaId();
      this.fornecedorService.editFornecedor(this.fornecedor).subscribe(() => {
        this.router.navigate(['fornecedores/lista']);
      },
      (error: any) => {
        console.error(error);
        this.spinner.hide();
        this.titu.hide();
        this.toastr.error(error.error);
      },
      () => this.spinner.hide()
    );
  }
}

onKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    event.preventDefault();
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
      cnpj: [null, Validators.required],
      inscricaoMunicipal: [null, Validators.required],
      inscricaoEstadual: [null, Validators.required],
      dataCadastroFornecedor: [null, Validators.required],
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
    this.router.navigate(['fornecedores/lista']);
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
  isTelefone(): boolean{
    return this.fornecedor.telefone == null ? true : this.fornecedor.telefone.length < 12 ? true : false;
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
