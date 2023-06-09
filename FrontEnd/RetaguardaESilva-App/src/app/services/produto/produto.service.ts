import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Produto } from 'src/app/models/produto';
import { environment } from 'src/environments/environment';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  baseURL = environment.apiURL + 'api/Produto?';
  baseURLGetUpdateDelete = environment.apiURL + 'api/Produto';
  baseURLFornecedor = environment.apiURL + 'api/Produto/api/Fornecedores?';
  baseURLGetUpdateDeleteFornecedor = environment.apiURL + 'api/Fornecedor';

  constructor(private http: HttpClient, private authService: AuthService) { }

  public addProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.baseURL, produto).pipe(take(1));
  }

  public editProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.baseURLGetUpdateDelete}/`, produto).pipe(take(1));
  }

  public getProdutos(empresaId: number) : Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.baseURL}empresaId=${empresaId}`).pipe(take(1));
  }

  public getProdutosById(id : number) : Observable<Produto>{
    return this.http.get<Produto>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
  }

  public delete(id : number) : Observable<any>{
    return this.http.delete<string>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
  }

  public getFornecedores(empresaId: number) : Observable<Fornecedor[]>{
    return this.http.get<Fornecedor[]>(`${this.baseURLFornecedor}empresaId=${empresaId}`).pipe(take(1));
  }

  public getFornecedorById(id : number) : Observable<Fornecedor>{
    return this.http.get<Fornecedor>(`${this.baseURLGetUpdateDeleteFornecedor}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
  }

}
