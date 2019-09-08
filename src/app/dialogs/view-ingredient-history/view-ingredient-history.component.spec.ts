import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIngredientHistoryComponent } from './view-ingredient-history.component';

describe('ViewIngredientHistoryComponent', () => {
  let component: ViewIngredientHistoryComponent;
  let fixture: ComponentFixture<ViewIngredientHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIngredientHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIngredientHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
