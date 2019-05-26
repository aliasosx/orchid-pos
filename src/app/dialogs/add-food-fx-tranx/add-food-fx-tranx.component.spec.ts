import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodFxTranxComponent } from './add-food-fx-tranx.component';

describe('AddFoodFxTranxComponent', () => {
  let component: AddFoodFxTranxComponent;
  let fixture: ComponentFixture<AddFoodFxTranxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFoodFxTranxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodFxTranxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
