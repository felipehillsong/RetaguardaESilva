/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsEmpresaDetalheService } from './AuthGuardsEmpresaDetalhe.service';

describe('Service: AuthGuardsEmpresaDetalhe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsEmpresaDetalheService]
    });
  });

  it('should ...', inject([AuthGuardsEmpresaDetalheService], (service: AuthGuardsEmpresaDetalheService) => {
    expect(service).toBeTruthy();
  }));
});
