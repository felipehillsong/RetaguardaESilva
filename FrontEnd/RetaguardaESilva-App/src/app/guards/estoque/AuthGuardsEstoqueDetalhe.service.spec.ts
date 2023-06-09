/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsEstoqueDetalheService } from './AuthGuardsEstoqueDetalhe.service';

describe('Service: AuthGuardsEstoqueDetalhe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsEstoqueDetalheService]
    });
  });

  it('should ...', inject([AuthGuardsEstoqueDetalheService], (service: AuthGuardsEstoqueDetalheService) => {
    expect(service).toBeTruthy();
  }));
});
