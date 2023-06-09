import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/login/auth.service';

@Injectable()
export class AuthGuardsEmpresaCadastroService implements CanActivate {

  constructor(private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var empresaCadastro = this.authService.permissoesDoUsuario()[0].empresaCadastro;
    return empresaCadastro;
  }
}
