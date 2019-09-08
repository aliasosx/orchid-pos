import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientTakeOffComponent } from './ingredient-take-off.component';

describe('IngredientTakeOffComponent', () => {
  let component: IngredientTakeOffComponent;
  let fixture: ComponentFixture<IngredientTakeOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientTakeOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientTakeOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
