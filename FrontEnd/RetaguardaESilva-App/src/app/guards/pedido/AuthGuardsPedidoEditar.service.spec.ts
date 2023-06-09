/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsPedidoEditarService } from './AuthGuardsPedidoEditar.service';

describe('Service: AuthGuardsPedidoEditar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsPedidoEditarService]
    });
  });

  it('should ...', inject([AuthGuardsPedidoEditarService], (service: AuthGuardsPedidoEditarService) => {
    expect(service).toBeTruthy();
  }));
});
