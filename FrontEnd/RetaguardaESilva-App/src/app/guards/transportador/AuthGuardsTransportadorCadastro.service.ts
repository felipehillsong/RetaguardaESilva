import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/login/auth.service';

@Injectable()
export class AuthGuardsTransportadorCadastroService implements CanActivate {

  constructor(private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var transportadorCadastro = this.authService.permissoesDoUsuario()[0].transportadorCadastro;
    return transportadorCadastro;
  }

}
