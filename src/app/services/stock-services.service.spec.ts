import { TestBed } from '@angular/core/testing';

import { StockServicesService } from './stock-services.service';

describe('StockServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockServicesService = TestBed.get(StockServicesService);
    expect(service).toBeTruthy();
  });
});
