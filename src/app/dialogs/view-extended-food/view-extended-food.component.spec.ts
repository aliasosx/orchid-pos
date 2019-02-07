import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExtendedFoodComponent } from './view-extended-food.component';

describe('ViewExtendedFoodComponent', () => {
  let component: ViewExtendedFoodComponent;
  let fixture: ComponentFixture<ViewExtendedFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExtendedFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExtendedFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
