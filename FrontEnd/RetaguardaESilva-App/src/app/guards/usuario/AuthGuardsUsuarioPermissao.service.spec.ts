/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsUsuarioPermissaoService } from './AuthGuardsUsuarioPermissao.service';

describe('Service: AuthGuardsUsuarioPermissao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsUsuarioPermissaoService]
    });
  });

  it('should ...', inject([AuthGuardsUsuarioPermissaoService], (service: AuthGuardsUsuarioPermissaoService) => {
    expect(service).toBeTruthy();
  }));
});
