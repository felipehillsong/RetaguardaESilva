/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsEmpresaCadastroService } from './AuthGuardsEmpresaCadastro.service';

describe('Service: AuthGuardsEmpresaCadastro', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsEmpresaCadastroService]
    });
  });

  it('should ...', inject([AuthGuardsEmpresaCadastroService], (service: AuthGuardsEmpresaCadastroService) => {
    expect(service).toBeTruthy();
  }));
});
