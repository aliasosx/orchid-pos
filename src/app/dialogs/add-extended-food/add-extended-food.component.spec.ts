import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExtendedFoodComponent } from './add-extended-food.component';

describe('AddExtendedFoodComponent', () => {
  let component: AddExtendedFoodComponent;
  let fixture: ComponentFixture<AddExtendedFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExtendedFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExtendedFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
