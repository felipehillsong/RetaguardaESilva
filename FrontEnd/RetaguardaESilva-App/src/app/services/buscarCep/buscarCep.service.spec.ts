/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BuscarCepService } from './buscarCep.service';

describe('Service: BuscarCep', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuscarCepService]
    });
  });

  it('should ...', inject([BuscarCepService], (service: BuscarCepService) => {
    expect(service).toBeTruthy();
  }));
});
