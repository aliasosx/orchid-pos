import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseBalanceComponent } from './close-balance.component';

describe('CloseBalanceComponent', () => {
  let component: CloseBalanceComponent;
  let fixture: ComponentFixture<CloseBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
