/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsEnderecoProdutoCadastroService } from './AuthGuardsEnderecoProdutoCadastro.service';

describe('Service: AuthGuardsEnderecoProdutoCadastro', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsEnderecoProdutoCadastroService]
    });
  });

  it('should ...', inject([AuthGuardsEnderecoProdutoCadastroService], (service: AuthGuardsEnderecoProdutoCadastroService) => {
    expect(service).toBeTruthy();
  }));
});
