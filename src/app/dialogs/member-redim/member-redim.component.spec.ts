import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRedimComponent } from './member-redim.component';

describe('MemberRedimComponent', () => {
  let component: MemberRedimComponent;
  let fixture: ComponentFixture<MemberRedimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRedimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRedimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
