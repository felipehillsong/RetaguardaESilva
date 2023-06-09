/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsFornecedorService } from './AuthGuardsFornecedor.service';

describe('Service: AuthGuardsFornecedor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsFornecedorService]
    });
  });

  it('should ...', inject([AuthGuardsFornecedorService], (service: AuthGuardsFornecedorService) => {
    expect(service).toBeTruthy();
  }));
});
