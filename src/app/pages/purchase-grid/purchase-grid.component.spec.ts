import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseGridComponent } from './purchase-grid.component';

describe('PurchaseGridComponent', () => {
  let component: PurchaseGridComponent;
  let fixture: ComponentFixture<PurchaseGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
