import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFoodComponent } from './view-food.component';

describe('ViewFoodComponent', () => {
  let component: ViewFoodComponent;
  let fixture: ComponentFixture<ViewFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
