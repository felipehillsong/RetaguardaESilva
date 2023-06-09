/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsPedidoCadastroService } from './AuthGuardsPedidoCadastro.service';

describe('Service: AuthGuardsPedidoCadastro', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsPedidoCadastroService]
    });
  });

  it('should ...', inject([AuthGuardsPedidoCadastroService], (service: AuthGuardsPedidoCadastroService) => {
    expect(service).toBeTruthy();
  }));
});
