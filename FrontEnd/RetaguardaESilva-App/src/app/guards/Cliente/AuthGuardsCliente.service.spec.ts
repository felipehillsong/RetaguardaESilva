/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsClienteService } from './AuthGuardsCliente.service';

describe('Service: AuthGuardsCliente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsClienteService]
    });
  });

  it('should ...', inject([AuthGuardsClienteService], (service: AuthGuardsClienteService) => {
    expect(service).toBeTruthy();
  }));
});
