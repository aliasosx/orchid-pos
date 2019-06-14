import { TestBed } from '@angular/core/testing';

import { PaymentServicesService } from './payment-services.service';

describe('PaymentServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentServicesService = TestBed.get(PaymentServicesService);
    expect(service).toBeTruthy();
  });
});
