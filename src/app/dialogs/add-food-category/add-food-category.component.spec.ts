import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodCategoryComponent } from './add-food-category.component';

describe('AddFoodCategoryComponent', () => {
  let component: AddFoodCategoryComponent;
  let fixture: ComponentFixture<AddFoodCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFoodCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
