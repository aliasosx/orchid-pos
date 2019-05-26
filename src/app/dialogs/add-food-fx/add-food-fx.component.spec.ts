import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodFxComponent } from './add-food-fx.component';

describe('AddFoodFxComponent', () => {
  let component: AddFoodFxComponent;
  let fixture: ComponentFixture<AddFoodFxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFoodFxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodFxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
