import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/login/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardsFornecedorEditarService implements CanActivate {

  constructor(private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var fornecedorEditar = this.authService.permissoesDoUsuario()[0].fornecedorEditar;
    return fornecedorEditar;
  }
}
