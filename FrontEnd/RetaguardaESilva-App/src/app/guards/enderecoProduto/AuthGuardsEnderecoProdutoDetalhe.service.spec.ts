/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsEnderecoProdutoDetalheService } from './AuthGuardsEnderecoProdutoDetalhe.service';

describe('Service: AuthGuardsEnderecoProdutoDetalhe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsEnderecoProdutoDetalheService]
    });
  });

  it('should ...', inject([AuthGuardsEnderecoProdutoDetalheService], (service: AuthGuardsEnderecoProdutoDetalheService) => {
    expect(service).toBeTruthy();
  }));
});
