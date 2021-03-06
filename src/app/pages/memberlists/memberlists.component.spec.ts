import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberlistsComponent } from './memberlists.component';

describe('MemberlistsComponent', () => {
  let component: MemberlistsComponent;
  let fixture: ComponentFixture<MemberlistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberlistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
