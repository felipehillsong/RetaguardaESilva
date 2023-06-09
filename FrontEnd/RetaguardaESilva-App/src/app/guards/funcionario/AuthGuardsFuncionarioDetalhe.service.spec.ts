/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsFuncionarioDetalheService } from './AuthGuardsFuncionarioDetalhe.service';

describe('Service: AuthGuardsFuncionarioDetalhe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsFuncionarioDetalheService]
    });
  });

  it('should ...', inject([AuthGuardsFuncionarioDetalheService], (service: AuthGuardsFuncionarioDetalheService) => {
    expect(service).toBeTruthy();
  }));
});
