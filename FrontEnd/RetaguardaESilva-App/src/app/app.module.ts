import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ModalModule } from 'ngx-bootstrap';
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ClienteComponent } from './components/clientes/cliente.component';
import { ClienteDetalheComponent } from './components/clientes/cliente-detalhe/cliente-detalhe.component';
import { ClienteEditarComponent } from './components/clientes/cliente-editar/cliente-editar.component';
import { ClienteListaComponent } from './components/clientes/cliente-lista/cliente-lista.component';
import { ClienteCriarComponent } from './components/clientes/cliente-criar/cliente-criar.component';
import { EmpresaComponent } from './components/empresas/empresa.component';
import { EmpresaListaComponent } from './components/empresas/empresa-lista/empresa-lista.component';
import { EmpresaCriarComponent } from './components/empresas/empresa-criar/empresa-criar.component';
import { EmpresaDetalheComponent } from './components/empresas/empresa-detalhe/empresa-detalhe.component';
import { EmpresaEditarComponent } from './components/empresas/empresa-editar/empresa-editar.component';
import { EstoqueComponent } from './components/estoques/estoque.component';
import { EstoqueDetalheComponent } from './components/estoques/estoque-detalhe/estoque-detalhe.component';
import { EstoqueEditarComponent } from './components/estoques/estoque-editar/estoque-editar.component';
import { EstoqueListaComponent } from './components/estoques/estoque-lista/estoque-lista.component';
import { FornecedorComponent } from './components/fornecedores/fornecedor.component';
import { FornecedorCriarComponent } from './components/fornecedores/fornecedor-criar/fornecedor-criar.component';
import { FornecedorDetalheComponent } from './components/fornecedores/fornecedor-detalhe/fornecedor-detalhe.component';
import { FornecedorEditarComponent } from './components/fornecedores/fornecedor-editar/fornecedor-editar.component';
import { FornecedorListaComponent } from './components/fornecedores/fornecedor-lista/fornecedor-lista.component';
import { FuncionarioComponent } from './components/funcionarios/funcionario.component';
import { FuncionarioCriarComponent } from './components/funcionarios/funcionario-criar/funcionario-criar.component';
import { FuncionarioDetalheComponent } from './components/funcionarios/funcionario-detalhe/funcionario-detalhe.component';
import { FuncionarioEditarComponent } from './components/funcionarios/funcionario-editar/funcionario-editar.component';
import { FuncionarioListaComponent } from './components/funcionarios/funcionario-lista/funcionario-lista.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProdutoComponent } from './components/produtos/produto.component';
import { TransportadorComponent } from './components/transportadores/transportador.component';
import { TransportadorCriarComponent } from './components/transportadores/transportador-criar/transportador-criar.component';
import { TransportadorDetalheComponent } from './components/transportadores/transportador-detalhe/transportador-detalhe.component';
import { TransportadorEditarComponent } from './components/transportadores/transportador-editar/transportador-editar.component';
import { TransportadorListaComponent } from './components/transportadores/transportador-lista/transportador-lista.component';
import { UsuarioComponent } from './components/usuarios/usuario.component';
import { UsuarioCriarComponent } from './components/usuarios/usuario-criar/usuario-criar.component';
import { UsuarioEditarComponent } from './components/usuarios/usuario-editar/usuario-editar.component';
import { UsuarioListaComponent } from './components/usuarios/usuario-lista/usuario-lista.component';
import { UsuarioPermissaoComponent } from './components/usuarios/usuario-permissao/usuario-permissao.component';
import { UsuarioSelecionarFuncionarioComponent } from './components/usuarios/usuario-selecionar-funcionario/usuario-selecionar-funcionario.component';
import { TituloComponent } from './shared/titulo/titulo.component';
import { NavComponent } from './shared/nav/Nav.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AuthGuardsClienteCadastroService } from './guards/Cliente/AuthGuardsClienteCadastro.service';
import { AuthGuardsClienteService } from './guards/Cliente/AuthGuardsCliente.service';
import { AuthGuardsClienteEditarService } from './guards/Cliente/AuthGuardsClienteEditar.service';
import { AuthGuardsClienteDetalheService } from './guards/Cliente/AuthGuardsClienteDetalhe.service';
import { AuthGuardsEmpresaDetalheService } from './guards/Empresa/AuthGuardsEmpresaDetalhe.service';
import { AuthGuardsEmpresaEditarService } from './guards/Empresa/AuthGuardsEmpresaEditar.service';
import { AuthGuardsEmpresaCadastroService } from './guards/Empresa/AuthGuardsEmpresaCadastro.service';
import { AuthGuardsService } from './guards/login/AuthGuardsService';
import { AuthGuardsFornecedorService } from './guards/Fornecedor/AuthGuardsFornecedor.service';
import { AuthGuardsFornecedorCadastroService } from './guards/Fornecedor/AuthGuardsFornecedorCadastro.service';
import { AuthGuardsFornecedorDetalheService } from './guards/Fornecedor/AuthGuardsFornecedorDetalhe.service';
import { AuthGuardsFornecedorEditarService } from './guards/Fornecedor/AuthGuardsFornecedorEditar.service';
import { AuthGuardsFuncionarioService } from './guards/funcionario/AuthGuardsFuncionario.service';
import { AuthGuardsFuncionarioCadastroService } from './guards/funcionario/AuthGuardsFuncionarioCadastro.service';
import { AuthGuardsFuncionarioDetalheService } from './guards/funcionario/AuthGuardsFuncionarioDetalhe.service';
import { AuthGuardsFuncionarioEditarService } from './guards/funcionario/AuthGuardsFuncionarioEditar.service';
import { AuthGuardsTransportadorService } from './guards/transportador/AuthGuardsTransportador.service';
import { AuthGuardsTransportadorCadastroService } from './guards/transportador/AuthGuardsTransportadorCadastro.service';
import { AuthGuardsTransportadorDetalheService } from './guards/transportador/AuthGuardsTransportadorDetalhe.service';
import { AuthGuardsTransportadorEditarService } from './guards/transportador/AuthGuardsTransportadorEditar.service';
import { AuthGuardsUsuarioPermissaoService } from './guards/usuario/AuthGuardsUsuarioPermissao.service';
import { AuthGuardsUsuarioService } from './guards/usuario/AuthGuardsUsuario.service';
import { AuthGuardsUsuarioCadastroService } from './guards/usuario/AuthGuardsUsuarioCadastro.service';
import { AuthGuardsUsuarioEditarService } from './guards/usuario/AuthGuardsUsuarioEditar.service';
import { ProdutoCriarComponent } from './components/produtos/produto-criar/produto-criar.component';
import { ProdutoDetalheComponent } from './components/produtos/produto-detalhe/produto-detalhe.component';
import { ProdutoEditarComponent } from './components/produtos/produto-editar/produto-editar.component';
import { AuthGuardsProdutoService } from './guards/produto/AuthGuardsProduto.service';
import { AuthGuardsProdutoCadastroService } from './guards/produto/AuthGuardsProdutoCadastro.service';
import { AuthGuardsProdutoDetalheService } from './guards/produto/AuthGuardsProdutoDetalhe.service';
import { AuthGuardsProdutoEditarService } from './guards/produto/AuthGuardsProdutoEditar.service';
import { ProdutoListaComponent } from './components/produtos/produto-lista/produto-lista.component';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { AuthGuardsEstoqueService } from './guards/estoque/AuthGuardsEstoque.service';
import { AuthGuardsEstoqueDetalheService } from './guards/estoque/AuthGuardsEstoqueDetalhe.service';
import { AuthGuardsEstoqueEditarService } from './guards/estoque/AuthGuardsEstoqueEditar.service';
import { EnderecoProdutoCriarComponent } from './components/enderecosProdutos/enderecoProduto-criar/enderecoProduto-criar.component';
import { EnderecoProdutoDetalheComponent } from './components/enderecosProdutos/enderecoProduto-detalhe/enderecoProduto-detalhe.component';
import { EnderecoProdutoEditarComponent } from './components/enderecosProdutos/enderecoProduto-editar/enderecoProduto-editar.component';
import { EnderecoProdutoListaComponent } from './components/enderecosProdutos/enderecoProduto-lista/enderecoProduto-lista.component';
import { EnderecoProdutoComponent } from './components/enderecosProdutos/enderecoProdutoComponent';
import { AuthGuardsEnderecoProdutoService } from './guards/enderecoProduto/AuthGuardsEnderecoProduto.service';
import { AuthGuardsEnderecoProdutoCadastroService } from './guards/enderecoProduto/AuthGuardsEnderecoProdutoCadastro.service';
import { AuthGuardsEnderecoProdutoDetalheService } from './guards/enderecoProduto/AuthGuardsEnderecoProdutoDetalhe.service';
import { AuthGuardsEnderecoProdutoEditarService } from './guards/enderecoProduto/AuthGuardsEnderecoProdutoEditar.service';
import { PedidoCriarComponent } from './components/pedidos/pedido-criar/pedido-criar.component';
import { PedidoDetalheComponent } from './components/pedidos/pedido-detalhe/pedido-detalhe.component';
import { PedidoEditarComponent } from './components/pedidos/pedido-editar/pedido-editar.component';
import { PedidoListaComponent } from './components/pedidos/pedido-lista/pedido-lista.component';
import { PedidoComponent } from './components/pedidos/pedido.component';
import { AuthGuardsPedidoService } from './guards/pedido/AuthGuardsPedido.service';
import { AuthGuardsPedidoCadastroService } from './guards/pedido/AuthGuardsPedidoCadastro.service';
import { AuthGuardsPedidoDetalheService } from './guards/pedido/AuthGuardsPedidoDetalhe.service';
import { AuthGuardsPedidoEditarService } from './guards/pedido/AuthGuardsPedidoEditar.service';
import { Select2Module } from 'ng-select2-component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NotaFiscalComponent } from './components/notasFiscais/notaFiscal.component';
import { NotaFiscalListaComponent } from './components/notasFiscais/notaFiscal-lista/notaFiscal-lista.component';
import { AuthGuardsNotaFiscalService } from './guards/notaFiscal/AuthGuardsNotaFiscal.service';
import { NotaFiscalPdfComponent } from './components/notasFiscais/notaFiscal-pdf/notaFiscal-pdf.component';
import { AuthGuardsNotaFiscalPdfService } from './guards/notaFiscal/AuthGuardsNotaFiscalPdf.service';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NotaFiscalGerarPdfComponent } from './components/notasFiscais/notaFiscal-gerarPdf/notaFiscal-gerarPdf.component';
import { RelatorioComponent } from './components/relatorios/relatorio.component';
import { GerarRelatorioComponent } from './components/relatorios/gerarRelatorio/gerarRelatorio.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { BlockUIModule } from 'ng-block-ui';

registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ClienteListaComponent,
    ClienteDetalheComponent,
    ClienteEditarComponent,
    ClienteCriarComponent,
    EmpresaComponent,
    EmpresaListaComponent,
    EmpresaCriarComponent,
    EmpresaEditarComponent,
    EmpresaDetalheComponent,
    EstoqueComponent,
    EstoqueEditarComponent,
    EstoqueDetalheComponent,
    EstoqueListaComponent,
    EnderecoProdutoComponent,
    EnderecoProdutoListaComponent,
    EnderecoProdutoCriarComponent,
    EnderecoProdutoEditarComponent,
    EnderecoProdutoDetalheComponent,
    FornecedorComponent,
    FornecedorListaComponent,
    FornecedorCriarComponent,
    FornecedorEditarComponent,
    FornecedorDetalheComponent,
    FuncionarioComponent,
    FuncionarioDetalheComponent,
    FuncionarioCriarComponent,
    FuncionarioEditarComponent,
    FuncionarioListaComponent,
    LoginComponent,
    NotaFiscalComponent,
    NotaFiscalListaComponent,
    NotaFiscalPdfComponent,
    NotaFiscalGerarPdfComponent,
    ProdutoComponent,
    ProdutoCriarComponent,
    ProdutoEditarComponent,
    ProdutoDetalheComponent,
    ProdutoListaComponent,
    PedidoComponent,
    PedidoCriarComponent,
    PedidoEditarComponent,
    PedidoDetalheComponent,
    PedidoListaComponent,
    RelatorioComponent,
    GerarRelatorioComponent,
    TituloComponent,
    TransportadorComponent,
    TransportadorListaComponent,
    TransportadorCriarComponent,
    TransportadorEditarComponent,
    TransportadorDetalheComponent,
    UsuarioComponent,
    UsuarioListaComponent,
    UsuarioCriarComponent,
    UsuarioSelecionarFuncionarioComponent,
    UsuarioEditarComponent,
    UsuarioPermissaoComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
   ],
  imports: [
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserModule,
    MatSliderModule,
    MatSelectModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    CollapseModule,
    CollapseModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Select2Module,
    MatAutocompleteModule,
    BlockUIModule,
    ScrollToModule.forRoot(),
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxMaskModule.forChild(),
    TooltipModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    })
  ],
exports: [
  MatInputModule,
  MatPaginatorModule,
  MatTableModule
],
  providers: [
    AuthGuardsService,
    AuthGuardsClienteService,
    AuthGuardsClienteCadastroService,
    AuthGuardsClienteEditarService,
    AuthGuardsClienteDetalheService,
    AuthGuardsEmpresaCadastroService,
    AuthGuardsEmpresaEditarService,
    AuthGuardsEmpresaDetalheService,
    AuthGuardsEstoqueService,
    AuthGuardsEstoqueEditarService,
    AuthGuardsEstoqueDetalheService,
    AuthGuardsEnderecoProdutoService,
    AuthGuardsEnderecoProdutoCadastroService,
    AuthGuardsEnderecoProdutoDetalheService,
    AuthGuardsEnderecoProdutoEditarService,
    AuthGuardsFornecedorService,
    AuthGuardsFornecedorCadastroService,
    AuthGuardsFornecedorDetalheService,
    AuthGuardsFornecedorEditarService,
    AuthGuardsFuncionarioService,
    AuthGuardsFuncionarioCadastroService,
    AuthGuardsFuncionarioEditarService,
    AuthGuardsFuncionarioDetalheService,
    AuthGuardsPedidoService,
    AuthGuardsPedidoCadastroService,
    AuthGuardsPedidoEditarService,
    AuthGuardsPedidoDetalheService,
    AuthGuardsProdutoService,
    AuthGuardsProdutoCadastroService,
    AuthGuardsProdutoDetalheService,
    AuthGuardsProdutoEditarService,
    AuthGuardsTransportadorService,
    AuthGuardsTransportadorCadastroService,
    AuthGuardsTransportadorDetalheService,
    AuthGuardsTransportadorEditarService,
    AuthGuardsUsuarioService,
    AuthGuardsUsuarioCadastroService,
    AuthGuardsUsuarioEditarService,
    AuthGuardsUsuarioPermissaoService,
    AuthGuardsNotaFiscalService,
    AuthGuardsNotaFiscalPdfService,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
