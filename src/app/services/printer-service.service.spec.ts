import { TestBed } from '@angular/core/testing';

import { PrinterServiceService } from './printer-service.service';

describe('PrinterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrinterServiceService = TestBed.get(PrinterServiceService);
    expect(service).toBeTruthy();
  });
});
