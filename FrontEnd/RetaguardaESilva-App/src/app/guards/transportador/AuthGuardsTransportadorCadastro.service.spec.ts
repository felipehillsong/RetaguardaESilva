/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsTransportadorCadastroService } from './AuthGuardsTransportadorCadastro.service';

describe('Service: AuthGuardsTransportadorCadastro', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsTransportadorCadastroService]
    });
  });

  it('should ...', inject([AuthGuardsTransportadorCadastroService], (service: AuthGuardsTransportadorCadastroService) => {
    expect(service).toBeTruthy();
  }));
});
