import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../login/auth.service';
import { Observable, take } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Funcionario } from 'src/app/models/funcionario';
import { Transportador } from 'src/app/models/transportador';
import { Usuario } from 'src/app/models/usuario';
import { Empresa } from 'src/app/models/empresa';
import { Produto } from 'src/app/models/produto';
import { Estoque } from 'src/app/models/estoque';
import { Pedido } from 'src/app/models/pedido';
import { NotaFiscal } from 'src/app/models/notaFiscal';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  baseURL = environment.apiURL + 'api/Relatorio?';

constructor(private http: HttpClient, private authService: AuthService) { }

public getRelatorioCliente(codigoRelatorio: number, dataInicio: string, dataFinal: string) : Observable<Cliente[]>{
  return this.http.get<Cliente[]>(`${this.baseURL}empresaId=${this.authService.empresaId()}&codigoRelatorio=${codigoRelatorio}&dataInicio=${dataInicio}&dataFinal=${dataFinal}`).pipe(take(1));
}

public getRelatorioFornecedores(codigoRelatorio: number, dataInicio: string, dataFinal: string) : Observable<Fornecedor[]>{
  return this.http.get<Fornecedor[]>(`${this.baseURL}empresaId=${this.authService.empresaId()}&codigoRelatorio=${codigoRelatorio}&dataInicio=${dataInicio}&dataFinal=${dataFinal}`).pipe(take(1));
}

public getRelatorioFornecedoresProdutos(codigoRelatorio: number) : Observable<Fornecedor[]>{
  return this.http.get<Fornecedor[]>(`${this.baseURL}empresaId=${this.authService.empresaId()}&codigoRelatorio=${codigoRelatorio}`).pipe(take(1));
}

public getRelatorioFuncionarios(codigoRelatorio: number, dataInicio: string, dataFinal: string) : Observable<Funcionario[]>{
  return this.http.get<Funcionario[]>(`${this.baseURL}empresaId=${this.authService.empresaId()}&codigoRelatorio=${codigoRelatorio}&dataInicio=${dataInicio}&dataFinal=${dataFinal}`).pipe(take(1));
}

public getRelatorioTransportadores(codigoRelatorio: number, dataInicio: string, dataFinal: string) : Observable<Transportador[]>{
  return this.http.get<Transportador[]>(`${this.baseURL}empresaId=${this.authService.empresaId()}&codigoRelatorio=${codigoRelatorio}&dataInicio=${dataInicio}&dataFinal=${dataFinal}`).pipe(take(1));
}

public getRelatorioUsuarios(codigoRelatorio: number, dataInicio: string, dataFinal: string) : Observable<Usuario[]>{
  return this.http.get<Usuario[]>(`${this.baseURL}empresaId=${this.authService.empresaId()}&codigoRelatorio=${codigoRelatorio}&dataInicio=${dataInicio}&dataFinal=${dataFinal}`).pipe(take(1));
}

public getRelatorioEmpresas(codigoRelatorio: number, dataInicio: string, dataFinal: string) : Observable<Empresa[]>{
  return this.http.get<Empresa[]>(`${this.baseURL}empresaId=${this.authService.empresaId()}&codigoRelatorio=${codigoRelatorio}&dataInicio=${dataInicio}&dataFinal=${dataFinal}`).pipe(take(1));
}

public getRelatorioProdutos(codigoRelatorio: number, dataInicio: string, dataFinal: string) : Observable<Produto[]>{
  return this.http.get<Produto[]>(`${this.baseURL}empresaId=${this.authService.empresaId()}&codigoRelatorio=${codigoRelatorio}&dataInicio=${dataInicio}&dataFinal=${dataFinal}`).pipe(take(1));
}

public getRelatorioEstoques(codigoRelatorio: number, dataInicio: string, dataFinal: string) : Observable<Estoque[]>{
  return this.http.get<Estoque[]>(`${this.baseURL}empresaId=${this.authService.empresaId()}&codigoRelatorio=${codigoRelatorio}&dataInicio=${dataInicio}&dataFinal=${dataFinal}`).pipe(take(1));
}

public getRelatorioPedidos(codigoRelatorio: number, dataInicio: string, dataFinal: string) : Observable<Pedido[]>{
  return this.http.get<Pedido[]>(`${this.baseURL}empresaId=${this.authService.empresaId()}&codigoRelatorio=${codigoRelatorio}&dataInicio=${dataInicio}&dataFinal=${dataFinal}`).pipe(take(1));
}

public getRelatorioNotasFiscais(codigoRelatorio: number, dataInicio: string, dataFinal: string) : Observable<NotaFiscal[]>{
  return this.http.get<NotaFiscal[]>(`${this.baseURL}empresaId=${this.authService.empresaId()}&codigoRelatorio=${codigoRelatorio}&dataInicio=${dataInicio}&dataFinal=${dataFinal}`).pipe(take(1));
}

}
