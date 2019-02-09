import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCashComponent } from './payment-cash.component';

describe('PaymentCashComponent', () => {
  let component: PaymentCashComponent;
  let fixture: ComponentFixture<PaymentCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
