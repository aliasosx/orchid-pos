import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockReviewComponent } from './stock-review.component';

describe('StockReviewComponent', () => {
  let component: StockReviewComponent;
  let fixture: ComponentFixture<StockReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
