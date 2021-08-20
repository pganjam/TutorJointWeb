import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorFlierComponent } from './tutor-flier.component';

describe('TutorFlierComponent', () => {
  let component: TutorFlierComponent;
  let fixture: ComponentFixture<TutorFlierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorFlierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorFlierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
