import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedFoodTypeComponent } from './extended-food-type.component';

describe('ExtendedFoodTypeComponent', () => {
  let component: ExtendedFoodTypeComponent;
  let fixture: ComponentFixture<ExtendedFoodTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedFoodTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedFoodTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
