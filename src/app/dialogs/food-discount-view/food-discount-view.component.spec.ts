import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDiscountViewComponent } from './food-discount-view.component';

describe('FoodDiscountViewComponent', () => {
  let component: FoodDiscountViewComponent;
  let fixture: ComponentFixture<FoodDiscountViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodDiscountViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDiscountViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
