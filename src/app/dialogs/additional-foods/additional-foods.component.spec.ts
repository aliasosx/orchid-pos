import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalFoodsComponent } from './additional-foods.component';

describe('AdditionalFoodsComponent', () => {
  let component: AdditionalFoodsComponent;
  let fixture: ComponentFixture<AdditionalFoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalFoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
