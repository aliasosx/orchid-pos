import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientPurchaseComponent } from './ingredient-purchase.component';

describe('IngredientPurchaseComponent', () => {
  let component: IngredientPurchaseComponent;
  let fixture: ComponentFixture<IngredientPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
