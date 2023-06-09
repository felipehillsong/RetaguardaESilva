/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsUsuarioCadastroService } from './AuthGuardsUsuarioCadastro.service';

describe('Service: AuthGuardsUsuarioCadastro', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsUsuarioCadastroService]
    });
  });

  it('should ...', inject([AuthGuardsUsuarioCadastroService], (service: AuthGuardsUsuarioCadastroService) => {
    expect(service).toBeTruthy();
  }));
});
