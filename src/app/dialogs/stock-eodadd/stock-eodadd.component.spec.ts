import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockEODAddComponent } from './stock-eodadd.component';

describe('StockEODAddComponent', () => {
  let component: StockEODAddComponent;
  let fixture: ComponentFixture<StockEODAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockEODAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockEODAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
