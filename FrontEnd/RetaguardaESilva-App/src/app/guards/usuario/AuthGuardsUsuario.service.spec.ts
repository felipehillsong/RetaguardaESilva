/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsUsuarioService } from './AuthGuardsUsuario.service';

describe('Service: AuthGuardsUsuario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsUsuarioService]
    });
  });

  it('should ...', inject([AuthGuardsUsuarioService], (service: AuthGuardsUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
