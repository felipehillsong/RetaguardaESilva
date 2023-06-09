import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/login/auth.service';

@Injectable()
export class AuthGuardsNotaFiscalPdfService implements CanActivate {

  constructor(private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var notaFiscalGerarPDF = this.authService.permissoesDoUsuario()[0].notaFiscalGerarPDF;
    return notaFiscalGerarPDF;
  }
  }

