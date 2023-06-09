import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/login/auth.service';

@Injectable()
export class AuthGuardsEmpresaDetalheService implements CanActivate {

  constructor(private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var empresaDetalhe = this.authService.permissoesDoUsuario()[0].empresaDetalhe;
    return empresaDetalhe;
  }

}
