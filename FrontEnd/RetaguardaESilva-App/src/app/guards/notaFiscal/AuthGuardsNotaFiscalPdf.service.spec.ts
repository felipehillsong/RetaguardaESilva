/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsNotaFiscalPdfService } from './AuthGuardsNotaFiscalPdf.service';

describe('Service: AuthGuardsNotaFiscalPdf', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsNotaFiscalPdfService]
    });
  });

  it('should ...', inject([AuthGuardsNotaFiscalPdfService], (service: AuthGuardsNotaFiscalPdfService) => {
    expect(service).toBeTruthy();
  }));
});
