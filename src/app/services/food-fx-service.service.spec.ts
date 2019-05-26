import { TestBed } from '@angular/core/testing';

import { FoodFxServiceService } from './food-fx-service.service';

describe('FoodFxServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodFxServiceService = TestBed.get(FoodFxServiceService);
    expect(service).toBeTruthy();
  });
});
