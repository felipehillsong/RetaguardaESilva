import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Titulos } from 'src/app/enums/titulos';
import { Permissao } from 'src/app/models/permissao';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { TituloService } from 'src/app/services/titulo/titulo.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-usuario-permissao',
  templateUrl: './usuario-permissao.component.html',
  styleUrls: ['./usuario-permissao.component.scss']
})
export class UsuarioPermissaoComponent implements OnInit {
  titulo =  Titulos.permissaoUsuario;
  form!: FormGroup;
  usuario = {} as Usuario;
  usuarioRetornoEdit = {} as Usuario;
  permissoes = {} as Permissao;
  usuarioId!: number;
  nome!: string;
  permissaoId!:number;
  toastr: any;
  visualizarPermissaoEmpresa!: boolean;
  visualizarPermissaoUsuario!: boolean;
  visualizarUsuario!:boolean;
  usuarioCadastro!: boolean;
  usuarioEditar!: boolean;
  usuarioPermissoes!: boolean;
  usuarioExcluir!: boolean;

  constructor(private router: Router, private fb: FormBuilder, public titu: TituloService, private spinner: NgxSpinnerService, public nav: NavService, private authService: AuthService, private route: ActivatedRoute, private usuarioService: UsuarioService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.permissoesDeTela();
    this.getUsuarioById();
    this.validation();
  }

  public getUsuarioById(): void{
    this.usuarioId = this.route.snapshot.params['id'];
    this.usuarioService.getUsuarioById(this.usuarioId).subscribe(
      (_usuario: Usuario) => {
        this.usuario = _usuario;
        this.nome = this.usuario.nome;
        this.permissaoId = this.usuario.permissoes[0].id;
        this.permissoes = this.usuario.permissoes[0];
        this.visualizarUsuario = this.usuario.permissoes[0].visualizarUsuario;
        this.usuarioCadastro = this.permissoes.usuarioCadastro;
        this.usuarioEditar = this.permissoes.usuarioEditar;
        this.usuarioPermissoes = this.permissoes.usuarioPermissoes;
        this.usuarioExcluir = this.permissoes.usuarioExcluir;
        if(this.authService.idDoUsuarioLogado() == this.usuarioId){
          this.visualizarPermissaoUsuario = false;
        }else{
          this.visualizarPermissaoUsuario = true;
        }
        this._changeDetectorRef.markForCheck();
      },
      error => console.log(error)
    );
  }

 public preencherChecks(permissao:Permissao):void{
    this.usuario.permissoes[0] = permissao;
    this.usuario.permissoes[0].id = this.permissaoId;
    this.usuario.permissoes[0].empresaId = this.authService.empresaId();
    this.usuario.permissoes[0].usuarioId = this.usuarioId;
    if(!this.visualizarPermissaoEmpresa){
      this.usuario.permissoes[0].visualizarEmpresa = false;
      this.usuario.permissoes[0].empresaCadastro = false;
      this.usuario.permissoes[0].empresaEditar = false;
      this.usuario.permissoes[0].empresaDetalhe = false;
      this.usuario.permissoes[0].empresaExcluir = false;
    }
    if(!this.visualizarPermissaoUsuario){
      this.usuario.permissoes[0].visualizarUsuario = this.visualizarUsuario;
      this.usuario.permissoes[0].usuarioCadastro = this.usuarioCadastro;
      this.usuario.permissoes[0].usuarioEditar = this.usuarioEditar;
      this.usuario.permissoes[0].usuarioPermissoes = this.usuarioPermissoes;
      this.usuario.permissoes[0].usuarioExcluir = this.usuarioExcluir;
    }
 }

  public Salvar(){
    this.spinner.show();
    if(this.form.valid){
      this.permissoes = {...this.form.value};
      this.preencherChecks(this.permissoes);
      this.usuarioService.editUsuario(this.usuario).subscribe(
        (_usuario: Usuario) => {
          this.usuarioRetornoEdit = _usuario;
          if(this.usuarioRetornoEdit.id == this.authService.idDoUsuarioLogado()){
          sessionStorage.clear();
          sessionStorage.setItem('loginRetorno', JSON.stringify(this.usuarioRetornoEdit));
          this._changeDetectorRef.markForCheck();
        }
        this.router.navigate(['usuarios/lista']);
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
    clienteCadastro: [null],
    clienteEditar: [null],
    clienteDetalhe: [null],
    clienteExcluir: [null],
    empresaCadastro: [null],
    empresaEditar: [null],
    empresaDetalhe: [null],
    empresaExcluir: [null],
    estoqueEditar: [null],
    estoqueDetalhe: [null],
    estoqueExcluir: [null],
    enderecoProdutoCadastro: [null],
    enderecoProdutoEditar: [null],
    enderecoProdutoDetalhe: [null],
    enderecoProdutoExcluir: [null],
    fornecedorCadastro: [null],
    fornecedorEditar: [null],
    fornecedorDetalhe: [null],
    fornecedorExcluir: [null],
    funcionarioCadastro: [null],
    funcionarioEditar: [null],
    funcionarioDetalhe: [null],
    funcionarioExcluir: [null],
    produtoCadastro: [null],
    produtoEditar: [null],
    produtoDetalhe: [null],
    produtoExcluir: [null],
    transportadorCadastro: [null],
    transportadorEditar: [null],
    transportadorDetalhe: [null],
    transportadorExcluir: [null],
    usuarioCadastro: [null],
    usuarioEditar: [null],
    usuarioPermissoes: [null],
    usuarioExcluir: [null],
    pedidoCadastro: [null],
    pedidoEditar: [null],
    pedidoDetalhe: [null],
    pedidoExcluir: [null],
    notaFiscalCadastro: [null],
    notaFiscalGerarPDF: [null],
    notaFiscalCancelar: [null],
    visualizarCliente: [null],
    visualizarEstoque: [null],
    visualizarFornecedor: [null],
    visualizarFuncionario: [null],
    visualizarProduto: [null],
    visualizarTransportador: [null],
    visualizarEmpresa: [null],
    visualizarUsuario: [null],
    visualizarPedido: [null],
    visualizarNotaFiscal: [null],
    gerarRelatorio: [null],
    visualizarEnderecoProduto: [null],
    empresaId: [null],
    usuarioId: [null]
  });
}

  public Voltar(){
    this.router.navigate(['usuarios/lista']);
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
    this.visualizarPermissaoEmpresa = this.authService.verificaPermissaoEmpresas();
  }

  public todosClientes(){
    if(this.permissoes.visualizarCliente == true){
      this.permissoes.clienteCadastro = false;
      this.permissoes.clienteEditar = false;
      this.permissoes.clienteDetalhe = false;
      this.permissoes.clienteExcluir = false;
    }
  }

  public liberarTodosClientes(){
    if(this.permissoes.clienteCadastro == false || this.permissoes.clienteEditar == false || this.permissoes.clienteDetalhe == false || this.permissoes.clienteExcluir == false){
      this.permissoes.visualizarCliente = true;
    }
  }

  public todosEstoques(){
    if(this.permissoes.visualizarEstoque == true){
      this.permissoes.visualizarEnderecoProduto = false
      this.permissoes.estoqueEditar = false;
      this.permissoes.estoqueDetalhe = false;
      this.permissoes.estoqueExcluir = false;
      this.permissoes.enderecoProdutoCadastro = false;
      this.permissoes.enderecoProdutoEditar = false;
      this.permissoes.enderecoProdutoDetalhe = false;
      this.permissoes.enderecoProdutoExcluir = false;
    }
  }

  public liberarTodosEstoques(){
    if(this.permissoes.estoqueEditar == false || this.permissoes.estoqueDetalhe == false || this.permissoes.estoqueExcluir == false){
      this.permissoes.visualizarEstoque = true;
    }
  }

  public todosEnderecosProdutos(){
    if(this.permissoes.visualizarEnderecoProduto == true){
      this.permissoes.enderecoProdutoCadastro = false;
      this.permissoes.enderecoProdutoEditar = false;
      this.permissoes.enderecoProdutoDetalhe = false;
      this.permissoes.enderecoProdutoExcluir = false;
      this.permissoes.visualizarEstoque = true;
    }else if(this.permissoes.visualizarEnderecoProduto == false){
      this.permissoes.visualizarEstoque = true;
    }
  }

  public liberarEnderecosProdutos(){
    if(this.permissoes.enderecoProdutoCadastro == false || this.permissoes.enderecoProdutoEditar == false || this.permissoes.enderecoProdutoDetalhe == false || this.permissoes.enderecoProdutoExcluir == false){
      this.permissoes.visualizarEnderecoProduto = true;
      this.permissoes.visualizarEstoque = true;
    }
  }

  public todosFornecedores(){
    if(this.permissoes.visualizarFornecedor == true){
      this.permissoes.fornecedorCadastro = false;
      this.permissoes.fornecedorEditar = false;
      this.permissoes.fornecedorDetalhe = false;
      this.permissoes.fornecedorExcluir = false;
    }
  }

  public liberarTodosFornecedores(){
    if(this.permissoes.fornecedorCadastro == false || this.permissoes.fornecedorEditar == false || this.permissoes.fornecedorDetalhe == false || this.permissoes.fornecedorExcluir == false){
      this.permissoes.visualizarFornecedor = true;
    }
  }

  public todosFuncionarios(){
    if(this.permissoes.visualizarFuncionario == true){
      this.permissoes.funcionarioCadastro = false;
      this.permissoes.funcionarioEditar = false;
      this.permissoes.funcionarioDetalhe = false;
      this.permissoes.funcionarioExcluir = false;
    }
  }

  public liberarTodosFuncionarios(){
    if(this.permissoes.funcionarioCadastro == false || this.permissoes.funcionarioEditar == false || this.permissoes.funcionarioDetalhe == false || this.permissoes.funcionarioExcluir == false){
      this.permissoes.visualizarFuncionario = true;
    }
  }

  public todosProdutos(){
    if(this.permissoes.visualizarProduto == true){
      this.permissoes.produtoCadastro = false;
      this.permissoes.produtoEditar = false;
      this.permissoes.produtoDetalhe = false;
      this.permissoes.produtoExcluir = false;
    }
  }

  public liberarTodosProdutos(){
    if(this.permissoes.produtoCadastro == false || this.permissoes.produtoEditar == false || this.permissoes.produtoDetalhe == false || this.permissoes.produtoExcluir == false){
      this.permissoes.visualizarProduto = true;
    }
  }

  public todosTransportadores(){
    if(this.permissoes.visualizarTransportador == true){
      this.permissoes.transportadorCadastro = false;
      this.permissoes.transportadorEditar = false;
      this.permissoes.transportadorDetalhe = false;
      this.permissoes.transportadorExcluir = false;
    }
  }

  public liberarTodosTransportadores(){
    if(this.permissoes.transportadorCadastro == false || this.permissoes.transportadorEditar == false || this.permissoes.transportadorDetalhe == false || this.permissoes.transportadorExcluir == false){
      this.permissoes.visualizarTransportador = true;
    }
  }

  public todasEmpresas(){
    if(this.permissoes.visualizarEmpresa == true){
      this.permissoes.empresaCadastro = false;
      this.permissoes.empresaEditar = false;
      this.permissoes.empresaDetalhe = false;
      this.permissoes.empresaExcluir = false;
    }
  }

  public liberarTodasEmpresas(){
    if(this.permissoes.empresaCadastro == false || this.permissoes.empresaEditar == false || this.permissoes.empresaDetalhe == false || this.permissoes.empresaExcluir == false){
      this.permissoes.visualizarEmpresa = true;
    }
  }

  public todosUsuarios(){
    if(this.permissoes.visualizarUsuario == true){
      this.permissoes.usuarioCadastro = false;
      this.permissoes.usuarioEditar = false;
      this.permissoes.usuarioPermissoes = false;
      this.permissoes.usuarioExcluir = false;
    }
  }

  public liberarTodosUsuarios(){
    if(this.permissoes.usuarioCadastro == false || this.permissoes.usuarioEditar == false || this.permissoes.usuarioPermissoes == false || this.permissoes.usuarioExcluir == false){
      this.permissoes.visualizarUsuario = true;
    }
  }

  public todosPedidos(){
    if(this.permissoes.visualizarPedido == true){
      this.permissoes.pedidoCadastro = false;
      this.permissoes.pedidoEditar = false;
      this.permissoes.pedidoDetalhe = false;
      this.permissoes.pedidoExcluir = false;
    }
  }

  public liberarTodosPedidos(){
    if(this.permissoes.pedidoCadastro == false || this.permissoes.pedidoEditar == false || this.permissoes.pedidoDetalhe == false || this.permissoes.pedidoExcluir == false){
      this.permissoes.visualizarPedido = true;
    }
  }

  public todasNotasFiscais(){
    if(this.permissoes.visualizarNotaFiscal == true){
      this.permissoes.notaFiscalCadastro = false;
      this.permissoes.notaFiscalGerarPDF = false;
      this.permissoes.notaFiscalCancelar = false;
    }
  }

  public liberarTodasNotasDiscais(){
    if(this.permissoes.notaFiscalCadastro == false || this.permissoes.notaFiscalGerarPDF == false || this.permissoes.notaFiscalCancelar == false){
      this.permissoes.visualizarNotaFiscal = true;
    }
  }
}
