import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelRemarksComponent } from './cancel-remarks.component';

describe('CancelRemarksComponent', () => {
  let component: CancelRemarksComponent;
  let fixture: ComponentFixture<CancelRemarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelRemarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
