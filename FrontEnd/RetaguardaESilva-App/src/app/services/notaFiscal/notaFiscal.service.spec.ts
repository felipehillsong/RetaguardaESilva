/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotaFiscalService } from './notaFiscal.service';

describe('Service: NotaFiscal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotaFiscalService]
    });
  });

  it('should ...', inject([NotaFiscalService], (service: NotaFiscalService) => {
    expect(service).toBeTruthy();
  }));
});
