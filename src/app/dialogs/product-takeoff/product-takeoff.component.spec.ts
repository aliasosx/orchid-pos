import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTakeoffComponent } from './product-takeoff.component';

describe('ProductTakeoffComponent', () => {
  let component: ProductTakeoffComponent;
  let fixture: ComponentFixture<ProductTakeoffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTakeoffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTakeoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
