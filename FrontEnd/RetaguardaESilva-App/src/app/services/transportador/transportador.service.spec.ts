/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransportadorService } from './transportador.service';

describe('Service: Transportador', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportadorService]
    });
  });

  it('should ...', inject([TransportadorService], (service: TransportadorService) => {
    expect(service).toBeTruthy();
  }));
});
