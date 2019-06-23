import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicsPromotionsComponent } from './dynamics-promotions.component';

describe('DynamicsPromotionsComponent', () => {
  let component: DynamicsPromotionsComponent;
  let fixture: ComponentFixture<DynamicsPromotionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicsPromotionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicsPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
