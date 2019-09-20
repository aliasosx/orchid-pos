import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngredientFoodComponent } from './add-ingredient-food.component';

describe('AddIngredientFoodComponent', () => {
  let component: AddIngredientFoodComponent;
  let fixture: ComponentFixture<AddIngredientFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIngredientFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIngredientFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
