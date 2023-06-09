/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsEmpresaEditarService } from './AuthGuardsEmpresaEditar.service';

describe('Service: AuthGuardsEmpresaEditar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsEmpresaEditarService]
    });
  });

  it('should ...', inject([AuthGuardsEmpresaEditarService], (service: AuthGuardsEmpresaEditarService) => {
    expect(service).toBeTruthy();
  }));
});
