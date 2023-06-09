/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsFornecedorCadastroService } from './AuthGuardsFornecedorCadastro.service';

describe('Service: AuthGuardsFornecedorCadastro', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsFornecedorCadastroService]
    });
  });

  it('should ...', inject([AuthGuardsFornecedorCadastroService], (service: AuthGuardsFornecedorCadastroService) => {
    expect(service).toBeTruthy();
  }));
});
