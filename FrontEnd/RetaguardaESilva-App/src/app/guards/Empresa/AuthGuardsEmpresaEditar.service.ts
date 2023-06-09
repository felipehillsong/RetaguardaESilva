import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/login/auth.service';

@Injectable()
export class AuthGuardsEmpresaEditarService implements CanActivate {

  constructor(private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var empresaEditar = this.authService.permissoesDoUsuario()[0].empresaEditar;
    return empresaEditar;
  }

}
