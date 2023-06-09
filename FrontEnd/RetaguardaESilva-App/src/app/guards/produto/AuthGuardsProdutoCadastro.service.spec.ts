/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsProdutoCadastroService } from './AuthGuardsProdutoCadastro.service';

describe('Service: AuthGuardsProdutoCadastro', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsProdutoCadastroService]
    });
  });

  it('should ...', inject([AuthGuardsProdutoCadastroService], (service: AuthGuardsProdutoCadastroService) => {
    expect(service).toBeTruthy();
  }));
});
