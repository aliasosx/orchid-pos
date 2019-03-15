import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenMonComponent } from './kitchen-mon.component';

describe('KitchenMonComponent', () => {
  let component: KitchenMonComponent;
  let fixture: ComponentFixture<KitchenMonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenMonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenMonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
