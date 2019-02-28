import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbconsoleComponent } from './dbconsole.component';

describe('DbconsoleComponent', () => {
  let component: DbconsoleComponent;
  let fixture: ComponentFixture<DbconsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbconsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbconsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
