/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsUsuarioEditarService } from './AuthGuardsUsuarioEditar.service';

describe('Service: AuthGuardsUsuarioEditar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsUsuarioEditarService]
    });
  });

  it('should ...', inject([AuthGuardsUsuarioEditarService], (service: AuthGuardsUsuarioEditarService) => {
    expect(service).toBeTruthy();
  }));
});
