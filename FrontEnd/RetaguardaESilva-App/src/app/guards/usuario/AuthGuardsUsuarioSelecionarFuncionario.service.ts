import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/login/auth.service';

@Injectable()
export class AuthGuardsUsuarioSelecionarFuncionarioService implements CanActivate {

  constructor(private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var usuarioCadastro = this.authService.permissoesDoUsuario()[0].usuarioCadastro;
    return usuarioCadastro;
  }

}
