/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardsService } from './AuthGuardsService';

describe('Service: Auth.guards', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsService]
    });
  });

  it('should ...', inject([AuthGuardsService], (service: AuthGuardsService) => {
    expect(service).toBeTruthy();
  }));
});
