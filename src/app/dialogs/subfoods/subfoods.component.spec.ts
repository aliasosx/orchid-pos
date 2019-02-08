import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubfoodsComponent } from './subfoods.component';

describe('SubfoodsComponent', () => {
  let component: SubfoodsComponent;
  let fixture: ComponentFixture<SubfoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubfoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubfoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
