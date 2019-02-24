import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbomComponent } from './addbom.component';

describe('AddbomComponent', () => {
  let component: AddbomComponent;
  let fixture: ComponentFixture<AddbomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
