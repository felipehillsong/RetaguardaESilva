import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fornecedor } from '../../models/fornecedor';
import { AuthService } from './../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
baseURL = environment.apiURL + 'api/Fornecedor?';
baseURLGetUpdateDelete = environment.apiURL + 'api/Fornecedor';
baseCepURL = environment.apiURL + 'api/Cep?';

constructor(private http: HttpClient, private authService: AuthService) { }

public addFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
return this.http.post<Fornecedor>(this.baseURL, fornecedor).pipe(take(1));
}

public editFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
return this.http.put<Fornecedor>(`${this.baseURLGetUpdateDelete}/`, fornecedor).pipe(take(1));
}

public getFornecedores(empresaId: number) : Observable<Fornecedor[]>{
return this.http.get<Fornecedor[]>(`${this.baseURL}empresaId=${empresaId}`).pipe(take(1));
}

public getFornecedorById(id : number) : Observable<Fornecedor>{
return this.http.get<Fornecedor>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
}

public delete(id : number) : Observable<any>{
return this.http.delete<string>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
}

public getCep(cep: string){
  return this.http.get(`${this.baseCepURL}cep=${cep}`).pipe(take(1));
}

}
