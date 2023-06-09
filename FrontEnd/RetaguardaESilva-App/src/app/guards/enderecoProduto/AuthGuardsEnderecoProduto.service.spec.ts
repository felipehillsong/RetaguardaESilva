/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsEnderecoProdutoService } from './AuthGuardsEnderecoProduto.service';

describe('Service: AuthGuardsEnderecoProduto', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsEnderecoProdutoService]
    });
  });

  it('should ...', inject([AuthGuardsEnderecoProdutoService], (service: AuthGuardsEnderecoProdutoService) => {
    expect(service).toBeTruthy();
  }));
});
