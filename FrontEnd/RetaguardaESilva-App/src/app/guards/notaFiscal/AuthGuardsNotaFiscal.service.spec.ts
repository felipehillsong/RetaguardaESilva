/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsNotaFiscalService } from './AuthGuardsNotaFiscal.service';

describe('Service: AuthGuardsNotaFiscalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsNotaFiscalService]
    });
  });

  it('should ...', inject([AuthGuardsNotaFiscalService], (service: AuthGuardsNotaFiscalService) => {
    expect(service).toBeTruthy();
  }));
});
