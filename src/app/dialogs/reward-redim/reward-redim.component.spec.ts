import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardRedimComponent } from './reward-redim.component';

describe('RewardRedimComponent', () => {
  let component: RewardRedimComponent;
  let fixture: ComponentFixture<RewardRedimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardRedimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardRedimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
