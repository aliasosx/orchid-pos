import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubFoodTranxComponent } from './add-sub-food-tranx.component';

describe('AddSubFoodTranxComponent', () => {
  let component: AddSubFoodTranxComponent;
  let fixture: ComponentFixture<AddSubFoodTranxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubFoodTranxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubFoodTranxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
