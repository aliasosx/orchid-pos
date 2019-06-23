import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionRoleComponent } from './promotion-role.component';

describe('PromotionRoleComponent', () => {
  let component: PromotionRoleComponent;
  let fixture: ComponentFixture<PromotionRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
