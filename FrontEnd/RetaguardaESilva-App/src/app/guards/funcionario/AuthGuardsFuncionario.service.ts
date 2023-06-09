import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/login/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardsFuncionarioService implements CanActivate {

  constructor(private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var visualizarFuncionario = this.authService.permissoesDoUsuario()[0].visualizarFuncionario;
    return visualizarFuncionario;
  }

}
