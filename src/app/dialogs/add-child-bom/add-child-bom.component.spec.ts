import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChildBomComponent } from './add-child-bom.component';

describe('AddChildBomComponent', () => {
  let component: AddChildBomComponent;
  let fixture: ComponentFixture<AddChildBomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChildBomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChildBomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
