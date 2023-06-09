import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, NumberValueAccessor } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Titulos } from 'src/app/enums/titulos';
import { Estoque } from 'src/app/models/estoque';
import { EstoqueService } from 'src/app/services/estoque/estoque.service';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-estoque-editar',
  templateUrl: './estoque-editar.component.html',
  styleUrls: ['./estoque-editar.component.scss']
})
export class EstoqueEditarComponent implements OnInit {
  titulo =  Titulos.editarEstoque;
  form!: FormGroup;
  estoque = {} as Estoque;
  estoqueId!:number;
  produtoId!:number;
  fornecedorId!:number;


  constructor(private router: Router, private route: ActivatedRoute, public titu: TituloService, private fb: FormBuilder, private estoqueService: EstoqueService, private toastr: ToastrService, private spinner: NgxSpinnerService, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getEstoqueById();
    this.validation();
  }

  public getEstoqueById(): void{
    this.estoqueId = this.route.snapshot.params['id'];
    this.estoqueService.getEstoquesById(this.estoqueId).subscribe(
      (_estoque: Estoque) => {
        this.estoque = _estoque;
        this.produtoId = this.estoque.produtoId;
        this.fornecedorId = this.estoque.fornecedorId;
        var dataBD = moment(  this.estoque.dataCadastroEstoque).format('YYYY-MM-DD');
        this.estoque.dataCadastroEstoque = dataBD;
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public Editar(): void {
    this.spinner.show();
    if(this.form.valid){
      this.estoque = {...this.form.value};
      this.preencherEstoque();
      this.estoqueService.editEstoque(this.estoque).subscribe(() => {
        this.router.navigate(['estoques/lista']);
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

public preencherEstoque(){
  this.estoque.empresaId = this.authService.empresaId();
  this.estoque.id = this.estoqueId;
  this.estoque.fornecedorId = this.fornecedorId;
  this.estoque.produtoId = this.produtoId;
}

  public validation(): void {
    this.form = this.fb.group({
      produtoNome: [null],
      fornecedorNome: [null],
      dataCadastroEstoque: [null],
      quantidade: [null, Validators.required]
    });
  }

  somenteNumeros(e: any):boolean {
    let charCode = e.charCode ? e.charCode : e.keyCode;
    // charCode 8 = backspace
    // charCode 9 = tab

    if (charCode != 8 && charCode != 9) {
      // charCode 48 equivale a 0
      // charCode 57 equivale a 9
      let max = 100;

      if ((charCode < 48 || charCode > 57)||(e.target.value.length >= max)) return false;
    }
    return true;
  }

  get f(): any {
    return this.form.controls;
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public Voltar(){
    this.router.navigate(['estoques/lista']);
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
