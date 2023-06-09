/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsPedidoService } from './AuthGuardsPedido.service';

describe('Service: AuthGuardsPedido', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsPedidoService]
    });
  });

  it('should ...', inject([AuthGuardsPedidoService], (service: AuthGuardsPedidoService) => {
    expect(service).toBeTruthy();
  }));
});
