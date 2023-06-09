import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
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
  selector: 'app-enderecoProduto-editar',
  templateUrl: './enderecoProduto-editar.component.html',
  styleUrls: ['./enderecoProduto-editar.component.scss']
})
export class EnderecoProdutoEditarComponent implements OnInit {
  titulo =  Titulos.editarEnderecoProduto;
  form!: FormGroup;
  enderecoProduto = {} as EnderecoProduto;
  estoque = {} as Estoque;
  enderecoProdutoId!:number;
  estoqueId!:number;
  produtoId!:number;
  empresaId!:number;
  ativo!:string;

  constructor(private router: Router, private route: ActivatedRoute, public titu: TituloService, private fb: FormBuilder, private estoqueService: EstoqueService, private toastr: ToastrService, private spinner: NgxSpinnerService, public nav: NavService, private _changeDetectorRef: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getEnderecoProdutoById()
    this.validation();
  }

  public getEnderecoProdutoById(): void{
    this.enderecoProdutoId = this.route.snapshot.params['id'];
    this.estoqueService.getEnderecoProdutoById(this.enderecoProdutoId).subscribe(
      (_enderecoProduto: EnderecoProduto) => {
        this.enderecoProduto = _enderecoProduto;
        this.preencherSelect();
        this.estoqueId = this.enderecoProduto.estoqueId;
        this.produtoId = this.enderecoProduto.produtoId;
        this.empresaId = this.enderecoProduto.empresaId;
        var dataBD = moment(this.enderecoProduto.dataCadastroEnderecoProduto).format('YYYY-MM-DD');
        this.enderecoProduto.dataCadastroEnderecoProduto = dataBD;
        this._changeDetectorRef.markForCheck();
        this.estoqueService.getEstoquesById(this.enderecoProduto.estoqueId).subscribe(
          (_estoque: Estoque) => {
            this.estoque = _estoque;
            this._changeDetectorRef.markForCheck();
          },
          error => console.log(error)
        );
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

  public preencherSelect(){
    if(this.enderecoProduto.ativo == true){
      this.ativo = 'Ativo';
      return [
        { id: '0', name: 'Inativo' },
        { id: '1', name: this.ativo }
      ];
    }else if(this.enderecoProduto.ativo == false){
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
      this.enderecoProduto.ativo = true;
    }
    else{
      this.enderecoProduto.ativo = false;
    }
  }

  public Enviar(): void {
    this.spinner.show();
    if(this.form.valid){
      this.enderecoProduto = {...this.form.value};
      this.preencherAtivo(this.form.value);
      this.enderecoProduto.id = this.enderecoProdutoId;
      this.enderecoProduto.empresaId = this.empresaId;
      this.enderecoProduto.produtoId = this.produtoId;
      this.enderecoProduto.estoqueId = this.estoqueId;
      this.estoqueService.editEnderecoProduto(this.enderecoProduto).subscribe(() => {
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

  public Voltar(){
    this.router.navigate(['estoques/lista']);
  }

  get f(): any {
    return this.form.controls;
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
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
      dataCadastroEnderecoProduto: [null, Validators.required],
      ativo: [null, Validators.required]
    });
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
