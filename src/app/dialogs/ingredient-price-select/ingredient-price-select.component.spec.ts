import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientPriceSelectComponent } from './ingredient-price-select.component';

describe('IngredientPriceSelectComponent', () => {
  let component: IngredientPriceSelectComponent;
  let fixture: ComponentFixture<IngredientPriceSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientPriceSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientPriceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
