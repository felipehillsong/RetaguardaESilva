/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsPedidoDetalheService } from './AuthGuardsPedidoDetalhe.service';

describe('Service: AuthGuardsPedidoDetalhe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsPedidoDetalheService]
    });
  });

  it('should ...', inject([AuthGuardsPedidoDetalheService], (service: AuthGuardsPedidoDetalheService) => {
    expect(service).toBeTruthy();
  }));
});
