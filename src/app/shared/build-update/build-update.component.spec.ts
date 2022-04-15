import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildUpdateComponent } from './build-update.component';

describe('BuildUpdateComponent', () => {
  let component: BuildUpdateComponent;
  let fixture: ComponentFixture<BuildUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
