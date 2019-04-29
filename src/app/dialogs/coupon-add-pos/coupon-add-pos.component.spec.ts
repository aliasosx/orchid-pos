import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponAddPosComponent } from './coupon-add-pos.component';

describe('CouponAddPosComponent', () => {
  let component: CouponAddPosComponent;
  let fixture: ComponentFixture<CouponAddPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponAddPosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponAddPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
