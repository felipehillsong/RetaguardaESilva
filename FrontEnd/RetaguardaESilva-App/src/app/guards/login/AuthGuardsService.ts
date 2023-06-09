import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/services/login/auth.service';
import { NavService } from 'src/app/services/nav/nav.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardsService implements CanActivate {

constructor(private router: Router, private authService: AuthService, public nav: NavService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(sessionStorage.getItem('loginRetorno') != null){
      return true;
    }
    else{
      this.router.navigate(['login']);
      sessionStorage.clear();
      return false;
    }
  }

  clearStorage(){
    this.nav.hide();
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  }

