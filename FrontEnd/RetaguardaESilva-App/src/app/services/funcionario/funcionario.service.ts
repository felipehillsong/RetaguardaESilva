import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cep } from '../../models/cep';
import { Funcionario } from '../../models/funcionario';
import { AuthService } from './../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
baseURL = environment.apiURL + 'api/Funcionario?';
baseURLGetUpdateDelete = environment.apiURL + 'api/Funcionario';
baseCepURL = environment.apiURL + 'api/Cep?';

constructor(private http: HttpClient, private authService: AuthService) { }

public addFuncionarios(funcionario: Funcionario): Observable<Funcionario> {
return this.http.post<Funcionario>(this.baseURL, funcionario).pipe(take(1));
}

public editFuncionarios(funcionario: Funcionario): Observable<Funcionario> {
return this.http.put<Funcionario>(`${this.baseURLGetUpdateDelete}/`, funcionario).pipe(take(1));
}

public getFuncionarios(empresaId: number) : Observable<Funcionario[]>{
return this.http.get<Funcionario[]>(`${this.baseURL}empresaId=${empresaId}`).pipe(take(1));
}

public getFuncionarioById(id : number) : Observable<Funcionario>{
return this.http.get<Funcionario>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
}

public delete(id : number) : Observable<any>{
return this.http.delete<string>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
}

public getCep(cep: string){
  return this.http.get(`${this.baseCepURL}cep=${cep}`).pipe(take(1));
}

}
