import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/login/auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardsTransportadorService implements CanActivate {

  constructor(private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var visualizarTransportador = this.authService.permissoesDoUsuario()[0].visualizarTransportador;
    return visualizarTransportador;
  }

}
