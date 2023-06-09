/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsFuncionarioService } from './AuthGuardsFuncionario.service';

describe('Service: AuthGuardsFuncionario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsFuncionarioService]
    });
  });

  it('should ...', inject([AuthGuardsFuncionarioService], (service: AuthGuardsFuncionarioService) => {
    expect(service).toBeTruthy();
  }));
});
