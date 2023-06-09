import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Permissoes } from 'src/app/enums/permissoes';
import { AuthService } from 'src/app/services/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardsEnderecoProdutoService implements CanActivate {

  constructor(private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var visualizarEnderecoProduto = this.authService.permissoesDoUsuario()[0].visualizarEnderecoProduto;
    return visualizarEnderecoProduto;
  }
}
