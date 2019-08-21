import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDiscountByIdComponent } from './view-discount-by-id.component';

describe('ViewDiscountByIdComponent', () => {
  let component: ViewDiscountByIdComponent;
  let fixture: ComponentFixture<ViewDiscountByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDiscountByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDiscountByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
