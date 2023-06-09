import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardsEstoqueEditarService implements CanActivate {

  constructor(private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var estoqueEditar = this.authService.permissoesDoUsuario()[0].estoqueEditar;
    return estoqueEditar;
  }
}
