/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsTransportadorDetalheService } from './AuthGuardsTransportadorDetalhe.service';

describe('Service: AuthGuardsTransportadorDetalhe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsTransportadorDetalheService]
    });
  });

  it('should ...', inject([AuthGuardsTransportadorDetalheService], (service: AuthGuardsTransportadorDetalheService) => {
    expect(service).toBeTruthy();
  }));
});
