import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { NotaFiscal } from 'src/app/models/notaFiscal';
import { environment } from 'src/environments/environment';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotaFiscalService {
  baseURL = environment.apiURL + 'api/NotaFiscal?';
  baseURLGetUpdateDelete = environment.apiURL + 'api/NotaFiscal';
  baseURLGerarPDF = environment.apiURL + 'api/NotaFiscal/api/NotaFiscal';
  baseURLAddNotaFiscal = environment.apiURL + 'api/Pedido/api/Pedido';

constructor(private http: HttpClient, private authService: AuthService) { }

public addNotaFiscal(notaFiscal: NotaFiscal): Observable<NotaFiscal> {
  return this.http.post<NotaFiscal>(`${this.baseURL}/`, notaFiscal).pipe(take(1));
}

public getNotasFiscais(empresaId: number) : Observable<NotaFiscal[]>{
  return this.http.get<NotaFiscal[]>(`${this.baseURL}empresaId=${empresaId}`).pipe(take(1));
}

public GetNotaFiscalPedidoById(id : number) : Observable<NotaFiscal>{
  return this.http.get<NotaFiscal>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
}

public GerarPdf(id : number) : Observable<NotaFiscal>{
  return this.http.get<NotaFiscal>(`${this.baseURLGerarPDF}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
}

public cancelar(id : number) : Observable<any>{
  return this.http.delete<string>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
  }

}
