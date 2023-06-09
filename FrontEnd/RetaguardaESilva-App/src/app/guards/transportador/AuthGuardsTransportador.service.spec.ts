/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsTransportadorService } from './AuthGuardsTransportador.service';

describe('Service: AuthGuardsTransportador', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsTransportadorService]
    });
  });

  it('should ...', inject([AuthGuardsTransportadorService], (service: AuthGuardsTransportadorService) => {
    expect(service).toBeTruthy();
  }));
});
