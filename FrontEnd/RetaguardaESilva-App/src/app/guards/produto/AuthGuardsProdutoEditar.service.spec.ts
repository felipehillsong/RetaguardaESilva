/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsProdutoEditarService } from './AuthGuardsProdutoEditar.service';

describe('Service: AuthGuardsProdutoEditar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsProdutoEditarService]
    });
  });

  it('should ...', inject([AuthGuardsProdutoEditarService], (service: AuthGuardsProdutoEditarService) => {
    expect(service).toBeTruthy();
  }));
});
