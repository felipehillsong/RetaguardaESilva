import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cep } from '../../models/cep';
import { Cliente } from '../../models/cliente';
import { AuthService } from './../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseURL = environment.apiURL + 'api/Cliente?';
  baseURLGetUpdateDelete = environment.apiURL + 'api/Cliente';
  baseCepURL = environment.apiURL + 'api/Cep?';

constructor(private http: HttpClient, private authService: AuthService) { }

public addCliente(cliente: Cliente): Observable<Cliente> {
  return this.http.post<Cliente>(this.baseURL, cliente).pipe(take(1));
}

public editCliente(cliente: Cliente): Observable<Cliente> {
  return this.http.put<Cliente>(`${this.baseURLGetUpdateDelete}/`, cliente).pipe(take(1));
}

public getClientes(empresaId: number) : Observable<Cliente[]>{
  return this.http.get<Cliente[]>(`${this.baseURL}empresaId=${empresaId}`).pipe(take(1));
}

public getClientesById(id : number) : Observable<Cliente>{
  return this.http.get<Cliente>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
}

public delete(id : number) : Observable<any>{
  return this.http.delete<string>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
}

}
