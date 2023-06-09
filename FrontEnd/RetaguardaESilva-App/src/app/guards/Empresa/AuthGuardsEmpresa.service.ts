import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Permissoes } from 'src/app/enums/permissoes';
import { AuthService } from '../../services/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardsEmpresaService implements CanActivate {

constructor(private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.authService.empresaId() == Permissoes.Administrador){
      return true;
    }else{
      return false;
    }
  }
}

