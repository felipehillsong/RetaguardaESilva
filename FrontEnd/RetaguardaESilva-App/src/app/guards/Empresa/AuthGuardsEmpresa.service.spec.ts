/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsEmpresaService } from './AuthGuardsEmpresa.service';

describe('Service: AuthGuardsServiceEmpresa', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsEmpresaService]
    });
  });

  it('should ...', inject([AuthGuardsEmpresaService], (service: AuthGuardsEmpresaService) => {
    expect(service).toBeTruthy();
  }));
});
