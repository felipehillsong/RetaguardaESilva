/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsClienteDetalheService } from './AuthGuardsClienteDetalhe.service';

describe('Service: AuthGuardsClienteDetalhe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsClienteDetalheService]
    });
  });

  it('should ...', inject([AuthGuardsClienteDetalheService], (service: AuthGuardsClienteDetalheService) => {
    expect(service).toBeTruthy();
  }));
});
