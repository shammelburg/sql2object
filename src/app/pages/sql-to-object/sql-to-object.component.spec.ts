import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlToObjectComponent } from './sql-to-object.component';

describe('SqlToObjectComponent', () => {
  let component: SqlToObjectComponent;
  let fixture: ComponentFixture<SqlToObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SqlToObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlToObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
