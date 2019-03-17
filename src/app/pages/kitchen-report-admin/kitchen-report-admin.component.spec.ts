import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenReportAdminComponent } from './kitchen-report-admin.component';

describe('KitchenReportAdminComponent', () => {
  let component: KitchenReportAdminComponent;
  let fixture: ComponentFixture<KitchenReportAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenReportAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenReportAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
