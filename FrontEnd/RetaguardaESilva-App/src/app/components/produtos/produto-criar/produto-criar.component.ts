import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Titulos } from 'src/app/enums/titulos';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Produto } from 'src/app/models/produto';
import { FornecedorService } from 'src/app/services/fornecedor/fornecedor.service';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-produto-criar',
  templateUrl: './produto-criar.component.html',
  styleUrls: ['./produto-criar.component.scss']
})
export class ProdutoCriarComponent implements OnInit {
  titulo =  Titulos.cadastroProduto;
  form!: FormGroup;
  produto = {} as Produto;
  public fornecedores: Fornecedor[] = [];
  fornecedorId!:number;
  dataHoje!:string;
  keyError!:string;
  valueError!:string;

  constructor(private router: Router,  public titu: TituloService, private fb: FormBuilder, private produtoService: ProdutoService, private toastr: ToastrService, private spinner: NgxSpinnerService, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getFornecedores();
    this.produto.dataCadastroProduto = new Date().toISOString().split('T')[0];
    this.validation();
  }

  public getFornecedores(): void{
    this.produtoService.getFornecedores(this.authService.empresaId()).subscribe(
      (_fornecedores: Fornecedor[]) => {
        this.fornecedores = _fornecedores;
      },
      error => console.log(error)
    );
  }

  public Enviar(): void {
    this.spinner.show();
    if(this.form.valid){
      this.produto = {...this.form.value};
      this.produto.fornecedorId = this.form.value.fornecedor.id;
      this.produto.empresaId = this.authService.empresaId();
      this.produtoService.addProduto(this.produto).subscribe(() => {
        this.router.navigate(['produtos/lista']);
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
      quantidade: [null, Validators.required],
      precoCompra: [null, Validators.required],
      precoVenda: [null, Validators.required],
      codigo: [null, Validators.required],
      dataCadastroProduto: [null, Validators.required],
      fornecedor: [null, Validators.required]
    });
  }

  public preencherFornecedorId(forms:any):number{
    var fornecedor = this.fornecedores.filter(f => f.nome == forms.fornecedor);
    return fornecedor[0].id;
  }

  get f(): any {
    return this.form.controls;
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public Voltar(){
    this.router.navigate(['produtos/lista']);
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

  validaDecimal(e: any){
    console.log(e);

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
