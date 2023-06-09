/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsFuncionarioEditarService } from './AuthGuardsFuncionarioEditar.service';

describe('Service: AuthGuardsFuncionarioEditar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsFuncionarioEditarService]
    });
  });

  it('should ...', inject([AuthGuardsFuncionarioEditarService], (service: AuthGuardsFuncionarioEditarService) => {
    expect(service).toBeTruthy();
  }));
});
