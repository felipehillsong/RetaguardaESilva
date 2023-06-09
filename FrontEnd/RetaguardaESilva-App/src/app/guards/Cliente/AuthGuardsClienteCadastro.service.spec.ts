/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsClienteCadastroService } from './AuthGuardsClienteCadastro.service';

describe('Service: AuthGuardsClienteCadastro', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsClienteCadastroService]
    });
  });

  it('should ...', inject([AuthGuardsClienteCadastroService], (service: AuthGuardsClienteCadastroService) => {
    expect(service).toBeTruthy();
  }));
});
