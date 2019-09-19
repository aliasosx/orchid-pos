import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientReportsComponent } from './ingredient-reports.component';

describe('IngredientReportsComponent', () => {
  let component: IngredientReportsComponent;
  let fixture: ComponentFixture<IngredientReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
