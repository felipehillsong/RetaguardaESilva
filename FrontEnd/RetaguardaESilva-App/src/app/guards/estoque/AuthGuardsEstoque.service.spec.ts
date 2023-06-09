/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsEstoqueService } from './AuthGuardsEstoque.service';

describe('Service: AuthGuardsEstoque', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsEstoqueService]
    });
  });

  it('should ...', inject([AuthGuardsEstoqueService], (service: AuthGuardsEstoqueService) => {
    expect(service).toBeTruthy();
  }));
});
