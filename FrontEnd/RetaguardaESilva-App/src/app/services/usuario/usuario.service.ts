import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcionario } from '../../models/funcionario';
import { Usuario } from '../../models/usuario';
import { AuthService } from './../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseURL = environment.apiURL + 'api/Usuario?';
  baseURLGetUpdateDelete = environment.apiURL + 'api/Usuario';
  baseURLGetFuncionariosUsuarios = environment.apiURL + 'api/Usuario/api/Usuario?';
  baseURLGetFuncionariosUsuariosById = environment.apiURL + 'api/Usuario/api/Usuario';
  baseCepURL = environment.apiURL + 'api/Cep?';

  constructor(private http: HttpClient, private authService: AuthService) { }

  public addUsuario(usuario: Usuario): Observable<Usuario> {
  return this.http.post<Usuario>(this.baseURL, usuario).pipe(take(1));
  }

  public editUsuario(usuario: Usuario): Observable<Usuario> {
  return this.http.put<Usuario>(`${this.baseURLGetUpdateDelete}/`, usuario).pipe(take(1));
  }

  public getUsuarios(empresaId: number) : Observable<Usuario[]>{
  return this.http.get<Usuario[]>(`${this.baseURL}empresaId=${empresaId}`).pipe(take(1));
  }

  public getFuncionariosUsuarios(empresaId: number) : Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(`${this.baseURLGetFuncionariosUsuarios}empresaId=${empresaId}`).pipe(take(1));
  }

  public getFuncionariosUsuariosById(id : number) : Observable<Funcionario>{
    return this.http.get<Funcionario>(`${this.baseURLGetFuncionariosUsuariosById}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
  }

  public getUsuarioById(id : number) : Observable<Usuario>{
  return this.http.get<Usuario>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
  }

  public delete(id : number) : Observable<any>{
  return this.http.delete<string>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
  }

}
