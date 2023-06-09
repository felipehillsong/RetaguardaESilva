/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsTransportadorEditarService } from './AuthGuardsTransportadorEditar.service';

describe('Service: AuthGuardsTransportadorEditar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsTransportadorEditarService]
    });
  });

  it('should ...', inject([AuthGuardsTransportadorEditarService], (service: AuthGuardsTransportadorEditarService) => {
    expect(service).toBeTruthy();
  }));
});
