import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCashComponent } from './open-cash.component';

describe('OpenCashComponent', () => {
  let component: OpenCashComponent;
  let fixture: ComponentFixture<OpenCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
