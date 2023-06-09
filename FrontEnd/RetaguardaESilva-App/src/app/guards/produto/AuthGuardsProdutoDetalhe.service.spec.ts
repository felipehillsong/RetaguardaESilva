/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsProdutoDetalheService } from './AuthGuardsProdutoDetalhe.service';

describe('Service: AuthGuardsProdutoDetalhe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsProdutoDetalheService]
    });
  });

  it('should ...', inject([AuthGuardsProdutoDetalheService], (service: AuthGuardsProdutoDetalheService) => {
    expect(service).toBeTruthy();
  }));
});
