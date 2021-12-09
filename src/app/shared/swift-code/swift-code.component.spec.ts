import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiftCodeComponent } from './swift-code.component';

describe('SwiftCodeComponent', () => {
  let component: SwiftCodeComponent;
  let fixture: ComponentFixture<SwiftCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwiftCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiftCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
