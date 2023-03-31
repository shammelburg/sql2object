import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonToSqlTableComponent } from './json-to-sql-table.component';

describe('JsonToSqlTableComponent', () => {
  let component: JsonToSqlTableComponent;
  let fixture: ComponentFixture<JsonToSqlTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonToSqlTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonToSqlTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
