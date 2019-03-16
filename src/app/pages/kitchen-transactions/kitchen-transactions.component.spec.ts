import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenTransactionsComponent } from './kitchen-transactions.component';

describe('KitchenTransactionsComponent', () => {
  let component: KitchenTransactionsComponent;
  let fixture: ComponentFixture<KitchenTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
