import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TituloService {
  visible: boolean;
  visibleTitulos: boolean;

  constructor() {this.visible = false; this.visibleTitulos = false; }
  hide() { return this.visible = false; }

  show() { return this.visible = true;}

  toggle() { return this.visible = !this.visible;}

  hideTitulo() { return this.visibleTitulos = false;}

  showTitulo() { return this.visibleTitulos = true;}

  toggleTitulo() { return this.visibleTitulos = !this.visibleTitulos;}

}
