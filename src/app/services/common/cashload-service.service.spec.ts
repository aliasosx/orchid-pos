import { TestBed } from '@angular/core/testing';

import { CashloadServiceService } from './cashload-service.service';

describe('CashloadServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CashloadServiceService = TestBed.get(CashloadServiceService);
    expect(service).toBeTruthy();
  });
});
