/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsRelatorioService } from './AuthGuardsRelatorio.service';

describe('Service: AuthGuardsRelatorio', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsRelatorioService]
    });
  });

  it('should ...', inject([AuthGuardsRelatorioService], (service: AuthGuardsRelatorioService) => {
    expect(service).toBeTruthy();
  }));
});
