import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Empresa } from '../../models/empresa';
import { environment } from 'src/environments/environment';
import { Cep } from '../../models/cep';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  baseURL = environment.apiURL + 'api/Empresa?';
  baseURLGetUpdateDelete = environment.apiURL + 'api/Empresa';
  baseCepURL = environment.apiURL + 'api/Cep?';

  constructor(private http: HttpClient) { }

  public addEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.baseURL, empresa).pipe(take(1));

  }
  public editEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.baseURLGetUpdateDelete}/`, empresa).pipe(take(1));
  }
  public getEmpresas() : Observable<Empresa[]>{
    return this.http.get<Empresa[]>(this.baseURL).pipe(take(1));
  }

  public getEmpresasById(id : number) : Observable<Empresa>{
    return this.http.get<Empresa>(`${this.baseURLGetUpdateDelete}/${id}`).pipe(take(1));
  }

  public delete(id : number) : Observable<any>{
    return this.http.delete<string>(`${this.baseURLGetUpdateDelete}/${id}`).pipe(take(1));
  }

  public getCep(cep: string){
    return this.http.get(`${this.baseCepURL}cep=${cep}`).pipe(take(1));
  }

}
