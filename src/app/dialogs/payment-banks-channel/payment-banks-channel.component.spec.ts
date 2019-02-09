import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBanksChannelComponent } from './payment-banks-channel.component';

describe('PaymentBanksChannelComponent', () => {
  let component: PaymentBanksChannelComponent;
  let fixture: ComponentFixture<PaymentBanksChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentBanksChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBanksChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
