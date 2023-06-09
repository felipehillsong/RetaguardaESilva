/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsEstoqueEditarService } from './AuthGuardsEstoqueEditar.service';

describe('Service: AuthGuardsEstoqueEditar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsEstoqueEditarService]
    });
  });

  it('should ...', inject([AuthGuardsEstoqueEditarService], (service: AuthGuardsEstoqueEditarService) => {
    expect(service).toBeTruthy();
  }));
});
