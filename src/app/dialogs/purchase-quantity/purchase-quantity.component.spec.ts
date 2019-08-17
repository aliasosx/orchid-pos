import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQuantityComponent } from './purchase-quantity.component';

describe('PurchaseQuantityComponent', () => {
  let component: PurchaseQuantityComponent;
  let fixture: ComponentFixture<PurchaseQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
