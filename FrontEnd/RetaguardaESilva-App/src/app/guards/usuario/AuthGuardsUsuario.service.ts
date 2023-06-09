import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/login/auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardsUsuarioService implements CanActivate {

  constructor(private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var visualizarUsuario = this.authService.permissoesDoUsuario()[0].visualizarUsuario;
    return visualizarUsuario;
  }

}
