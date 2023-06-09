import { Injectable } from '@angular/core';
import { Permissao } from '../../models/permissao';
import { AuthService } from './../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  visible: boolean;
  visibleEmpresa: boolean;
  visibleCliente: boolean;
  visibleFornecedor: boolean;
  visibleFuncionario: boolean;
  visibleEstoque: boolean;
  visibleEnderecoProduto: boolean;
  visibleProduto: boolean;
  visibleTransportador: boolean;
  visibleUsuario: boolean;
  visiblePedido: boolean;
  visibleNotaFiscal: boolean;
  visibleRelatorio: boolean;
  constructor() {this.visible = false; this.visibleEmpresa = false; this.visibleCliente = false; this.visibleFornecedor = false;
  this.visibleFuncionario = false; this.visibleTransportador = false; this.visibleProduto = false; this.visibleUsuario = false;
   this.visiblePedido = false; this.visibleNotaFiscal = false; this.visibleRelatorio = false; this.visibleEstoque = false; this.visibleEnderecoProduto = false;}
  hide() { return this.visible = false; }

  show() { return this.visible = true; }

  toggle() { return this.visible = !this.visible; }

  visualizarCliente() { return this.visibleCliente = true; }

  naoVisualizarCliente() { return this.visibleCliente = false; }

  visualizarEstoque() { return this.visibleEstoque = true; }

  naoVisualizarEstoque() { return this.visibleEstoque = false; }

  visualizarEnderecoProduto() { return this.visibleEnderecoProduto = true; }

  naoVisualizarEnderecoProduto() { return this.visibleEnderecoProduto = false; }

  visualizarFornecedor() { return this.visibleFornecedor = true; }

  naoVisualizarFornecedor() { return this.visibleFornecedor = false; }

  visualizarFuncionario() { return this.visibleFuncionario = true; }

  naoVisualizarFuncionario() { return this.visibleFuncionario = false; }

  visualizarProduto() { return this.visibleProduto = true; }

  naoVisualizarProduto() { return this.visibleProduto = false; }

  visualizarTransportador() { return this.visibleTransportador = true; }

  naoVisualizarTransportador() { return this.visibleTransportador = false; }

  visualizarUsuario() { return this.visibleUsuario = true; }

  naoVisualizarUsuario() { return this.visibleUsuario = false; }

  visualizarPedido() { return this.visiblePedido = true; }

  naoVisualizarPedido() { return this.visiblePedido = false; }

  visualizarNotaFiscal() { return this.visibleNotaFiscal = true; }

  naoVisualizarNotaFiscal() { return this.visibleNotaFiscal = false; }

  gerarRelatorio() { return this.visibleRelatorio = true; }

  naoGerarRelatorio() { return this.visibleRelatorio = false; }

  hideEmpresa() { this.visibleEmpresa = false; }

  showEmpresa() { this.visibleEmpresa = true; }

  toggleEmpresa() { this.visibleEmpresa = !this.visibleEmpresa; }
}
