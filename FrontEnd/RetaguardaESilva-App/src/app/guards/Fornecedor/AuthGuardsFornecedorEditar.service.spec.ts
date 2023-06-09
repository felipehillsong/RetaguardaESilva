/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsFornecedorEditarService } from './AuthGuardsFornecedorEditar.service';

describe('Service: AuthGuardsFornecedorEditar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsFornecedorEditarService]
    });
  });

  it('should ...', inject([AuthGuardsFornecedorEditarService], (service: AuthGuardsFornecedorEditarService) => {
    expect(service).toBeTruthy();
  }));
});
