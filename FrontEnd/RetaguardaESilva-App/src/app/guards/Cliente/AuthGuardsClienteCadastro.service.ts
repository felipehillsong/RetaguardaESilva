import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/login/auth.service';

@Injectable()
export class AuthGuardsClienteCadastroService implements CanActivate{

constructor(private authService: AuthService) { }
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  var clienteCadastro = this.authService.permissoesDoUsuario()[0].clienteCadastro;
  return clienteCadastro;
}

}
