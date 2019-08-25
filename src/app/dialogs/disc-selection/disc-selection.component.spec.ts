import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscSelectionComponent } from './disc-selection.component';

describe('DiscSelectionComponent', () => {
  let component: DiscSelectionComponent;
  let fixture: ComponentFixture<DiscSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
