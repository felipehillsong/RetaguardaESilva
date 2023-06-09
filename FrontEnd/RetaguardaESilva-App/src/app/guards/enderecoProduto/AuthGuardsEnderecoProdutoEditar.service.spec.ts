/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsEnderecoProdutoEditarService } from './AuthGuardsEnderecoProdutoEditar.service';

describe('Service: AuthGuardsEnderecoProdutoEditar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsEnderecoProdutoEditarService]
    });
  });

  it('should ...', inject([AuthGuardsEnderecoProdutoEditarService], (service: AuthGuardsEnderecoProdutoEditarService) => {
    expect(service).toBeTruthy();
  }));
});
