import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailsByFoodGroupComponent } from './report-details-by-food-group.component';

describe('ReportDetailsByFoodGroupComponent', () => {
  let component: ReportDetailsByFoodGroupComponent;
  let fixture: ComponentFixture<ReportDetailsByFoodGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDetailsByFoodGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetailsByFoodGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
