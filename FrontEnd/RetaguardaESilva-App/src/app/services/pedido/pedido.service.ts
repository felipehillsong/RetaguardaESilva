import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Pedido } from 'src/app/models/pedido';
import { environment } from 'src/environments/environment';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  baseURL = environment.apiURL + 'api/Pedido?';
  baseURLGetUpdateDelete = environment.apiURL + 'api/Pedido';
  baseURLAddNotaFiscal = environment.apiURL + 'api/Pedido/api/Pedido';

constructor(private http: HttpClient, private authService: AuthService) { }

public addPedido(pedido: Pedido): Observable<Pedido> {
  return this.http.post<Pedido>(this.baseURL, pedido).pipe(take(1));
}

public editPedido(pedido: Pedido): Observable<Pedido> {
  return this.http.put<Pedido>(`${this.baseURLGetUpdateDelete}/`, pedido).pipe(take(1));
}

public getPedidos(empresaId: number) : Observable<Pedido[]>{
  return this.http.get<Pedido[]>(`${this.baseURL}empresaId=${empresaId}`).pipe(take(1));
}

public getPedidoById(id : number) : Observable<Pedido>{
  return this.http.get<Pedido>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
}

public delete(id : number) : Observable<any>{
  return this.http.delete<string>(`${this.baseURLGetUpdateDelete}/${id}?empresaId=${this.authService.empresaId()}`).pipe(take(1));
}

}
