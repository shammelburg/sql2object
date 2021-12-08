import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsharpCodeComponent } from './csharp-code.component';

describe('CsharpCodeComponent', () => {
  let component: CsharpCodeComponent;
  let fixture: ComponentFixture<CsharpCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsharpCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsharpCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
