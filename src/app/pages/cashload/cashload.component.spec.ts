import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashloadComponent } from './cashload.component';

describe('CashloadComponent', () => {
  let component: CashloadComponent;
  let fixture: ComponentFixture<CashloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
