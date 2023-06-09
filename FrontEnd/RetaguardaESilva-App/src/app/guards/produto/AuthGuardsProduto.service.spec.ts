/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsProdutoService } from './AuthGuardsProduto.service';

describe('Service: AuthGuardsProduto', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsProdutoService]
    });
  });

  it('should ...', inject([AuthGuardsProdutoService], (service: AuthGuardsProdutoService) => {
    expect(service).toBeTruthy();
  }));
});
