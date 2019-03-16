import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBilldetailsComponent } from './view-billdetails.component';

describe('ViewBilldetailsComponent', () => {
  let component: ViewBilldetailsComponent;
  let fixture: ComponentFixture<ViewBilldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBilldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBilldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
