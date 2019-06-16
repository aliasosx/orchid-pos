import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromotionFoodComponent } from './add-promotion-food.component';

describe('AddPromotionFoodComponent', () => {
  let component: AddPromotionFoodComponent;
  let fixture: ComponentFixture<AddPromotionFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPromotionFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPromotionFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
