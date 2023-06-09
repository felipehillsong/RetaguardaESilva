/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TituloService } from './titulo.service';

describe('Service: Titulo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TituloService]
    });
  });

  it('should ...', inject([TituloService], (service: TituloService) => {
    expect(service).toBeTruthy();
  }));
});
