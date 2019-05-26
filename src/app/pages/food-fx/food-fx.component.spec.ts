import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodFxComponent } from './food-fx.component';

describe('FoodFxComponent', () => {
  let component: FoodFxComponent;
  let fixture: ComponentFixture<FoodFxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodFxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodFxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
