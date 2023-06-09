import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Titulos } from 'src/app/enums/titulos';
import { EnderecoProduto } from 'src/app/models/enderecoProduto';
import { Estoque } from 'src/app/models/estoque';
import { EstoqueService } from 'src/app/services/estoque/estoque.service';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';

@Component({
  selector: 'app-enderecoProduto-criar',
  templateUrl: './enderecoProduto-criar.component.html',
  styleUrls: ['./enderecoProduto-criar.component.scss']
})
export class EnderecoProdutoCriarComponent implements OnInit {
  titulo =  Titulos.cadastroEnderecoProduto;
  form!: FormGroup;
  enderecoProduto = {} as EnderecoProduto;
  estoque = {} as Estoque;
  enderecoProdutoId!:number;
  estoqueId!:number;
  produtoId!:number;
  empresaId!:number;

  constructor(private router: Router, private route: ActivatedRoute, public titu: TituloService, private fb: FormBuilder, private estoqueService: EstoqueService, private toastr: ToastrService, private spinner: NgxSpinnerService, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit() {
    this.enderecoProduto.dataCadastroEnderecoProduto = new Date().toISOString().split('T')[0];
    this.permissoesDeTela();
    this.getEstoqueById()
    this.validation();
  }

  public getEstoqueById(): void{
    this.estoqueId = this.route.snapshot.params['id'];
    this.estoqueService.getEstoquesById(this.estoqueId).subscribe(
      (_estoque: Estoque) => {
        this.estoque = _estoque;
        this.produtoId = this.estoque.produtoId;
        this.empresaId = this.estoque.empresaId;
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public Enviar(): void {
    this.spinner.show();
    if(this.form.valid){
      this.enderecoProduto = {...this.form.value};
      this.enderecoProduto.empresaId = this.empresaId;
      this.enderecoProduto.produtoId = this.produtoId;
      this.enderecoProduto.estoqueId = this.estoqueId;
      this.estoqueService.addEnderecoProduto(this.enderecoProduto).subscribe(() => {
        this.router.navigate(['estoques/lista']);
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
    nomeEndereco: [
      null,
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ],
    ],
    produtoNome: [null],
    dataCadastroEnderecoProduto: [null, Validators.required]
  });
}

public Voltar(){
  this.router.navigate(['estoques/lista']);
}

get f(): any {
  return this.form.controls;
}

public cssValidator(campoForm: FormControl | AbstractControl): any {
  return { 'is-invalid': campoForm.errors && campoForm.touched };
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
