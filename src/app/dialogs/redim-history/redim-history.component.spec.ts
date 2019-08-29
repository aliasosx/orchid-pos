import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedimHistoryComponent } from './redim-history.component';

describe('RedimHistoryComponent', () => {
  let component: RedimHistoryComponent;
  let fixture: ComponentFixture<RedimHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedimHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedimHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
