import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffBenefitComponent } from './staff-benefit.component';

describe('StaffBenefitComponent', () => {
  let component: StaffBenefitComponent;
  let fixture: ComponentFixture<StaffBenefitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffBenefitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffBenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
