import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeCoursesComponent } from './free-courses.component';

describe('FreeCoursesComponent', () => {
  let component: FreeCoursesComponent;
  let fixture: ComponentFixture<FreeCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
