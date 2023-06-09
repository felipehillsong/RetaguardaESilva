/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsFuncionarioCadastroService } from './AuthGuardsFuncionarioCadastro.service';

describe('Service: AuthGuardsFuncionarioCadastro', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsFuncionarioCadastroService]
    });
  });

  it('should ...', inject([AuthGuardsFuncionarioCadastroService], (service: AuthGuardsFuncionarioCadastroService) => {
    expect(service).toBeTruthy();
  }));
});
