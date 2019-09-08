import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientTakeInComponent } from './ingredient-take-in.component';

describe('IngredientTakeInComponent', () => {
  let component: IngredientTakeInComponent;
  let fixture: ComponentFixture<IngredientTakeInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientTakeInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientTakeInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
