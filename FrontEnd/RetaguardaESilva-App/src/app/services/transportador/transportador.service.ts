import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cep } from '../../models/cep';
import { Transportador } from '../../models/transportador';
import { AuthService } from './../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransportadorService {
  baseURL = environment.apiURL + 'api/Transportador?';
  baseURLGetUpdateDelete = environment.apiURL + 'api/Transportador';
  baseCepURL = environment.apiURL + 'api/Cep?';

  constructor(private http: HttpClient, private authService: AuthService) { }

  public addTransportador(transportador: Transportador): Observable<Transportador> {
  return this.http.post<Transportador>(this.baseURL, transportador).pipe(take(1));
  }

  public editTransportador(transportador: Transportador): Observable<Transportador> {
  return this.http.put<Transportador>(`${this.baseURLGetUpdateDelete}/`, transportador).pipe(take(1));
  }

  public getTransportadores(empresaId: number) : Observable<Transportador[]>{
  return this.http.get<Transportador[]>(`${this.baseURL}empresaId=${empresaId}`).pipe(take(1));
  }

  public getTransportadorById(id : number) : Observable<Transportador>{
  return this.http.get<Transportador>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
  }

  public delete(id : number) : Observable<any>{
  return this.http.delete<string>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
  }

  public getCep(cep: string){
    return this.http.get(`${this.baseCepURL}cep=${cep}`).pipe(take(1));
  }

  }
