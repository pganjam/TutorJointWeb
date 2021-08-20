import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFlierComponent } from './course-flier.component';

describe('CourseFlierComponent', () => {
  let component: CourseFlierComponent;
  let fixture: ComponentFixture<CourseFlierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseFlierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFlierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
