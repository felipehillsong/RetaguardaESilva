import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { EnderecoProduto } from 'src/app/models/enderecoProduto';
import { Estoque } from 'src/app/models/estoque';
import { environment } from 'src/environments/environment';
import { AuthService } from './../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  baseURL = environment.apiURL + 'api/Estoque?';
  baseURLGetUpdateDelete = environment.apiURL + 'api/Estoque';
  baseURLGetEnderecoProdutoId = environment.apiURL + 'api/Estoque/api/id/Estoque?';
  baseURLGetDeleteEnderecoProdutoId = environment.apiURL + 'api/Estoque/api/Estoque?';
  baseURLUpdateEnderecoProdutoId = environment.apiURL + 'api/Estoque/api/Estoque';

constructor(private http: HttpClient, private authService: AuthService) { }

public editEstoque(estoque:Estoque): Observable<Estoque> {
  return this.http.put<Estoque>(this.baseURLGetUpdateDelete, estoque).pipe(take(1));
}

public getEstoques(empresaId: number) : Observable<Estoque[]>{
  return this.http.get<Estoque[]>(`${this.baseURL}empresaId=${empresaId}`).pipe(take(1));
}

public getEstoquesById(id : number) : Observable<Estoque>{
  return this.http.get<Estoque>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
}

public delete(id : number) : Observable<any>{
  return this.http.delete<string>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
}

public addEnderecoProduto(enderecoProduto: EnderecoProduto): Observable<EnderecoProduto> {
  return this.http.post<EnderecoProduto>(this.baseURL, enderecoProduto).pipe(take(1));
}

public getEnderecoProdutoById(id : number) : Observable<EnderecoProduto>{
  return this.http.get<EnderecoProduto>(`${this.baseURLGetEnderecoProdutoId}empresaId=${this.authService.empresaId()}&id=${id}`).pipe(take(1));
}

public editEnderecoProduto(enderecoProduto:EnderecoProduto): Observable<EnderecoProduto> {
  return this.http.put<EnderecoProduto>(this.baseURLUpdateEnderecoProdutoId, enderecoProduto).pipe(take(1));
}

public getEnderecoProduto(empresaId: number) : Observable<EnderecoProduto[]>{
  return this.http.get<EnderecoProduto[]>(`${this.baseURLGetDeleteEnderecoProdutoId}empresaId=${empresaId}`).pipe(take(1));
}

public deleteEnderecoProduto(id : number) : Observable<any>{
  return this.http.delete<string>(`${this.baseURLGetDeleteEnderecoProdutoId}empresaId=${this.authService.empresaId()}&id=${id}`).pipe(take(1));
}

}
