/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsFornecedorDetalheService } from './AuthGuardsFornecedorDetalhe.service';

describe('Service: AuthGuardsFornecedorDetalhe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsFornecedorDetalheService]
    });
  });

  it('should ...', inject([AuthGuardsFornecedorDetalheService], (service: AuthGuardsFornecedorDetalheService) => {
    expect(service).toBeTruthy();
  }));
});
