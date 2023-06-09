/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsClienteEditarService } from './AuthGuardsClienteEditar.service';

describe('Service: AuthGuardsClienteEditar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsClienteEditarService]
    });
  });

  it('should ...', inject([AuthGuardsClienteEditarService], (service: AuthGuardsClienteEditarService) => {
    expect(service).toBeTruthy();
  }));
});
