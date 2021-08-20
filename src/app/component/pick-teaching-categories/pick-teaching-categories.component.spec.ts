import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickTeachingCategoriesComponent } from './pick-teaching-categories.component';

describe('PickTeachingCategoriesComponent', () => {
  let component: PickTeachingCategoriesComponent;
  let fixture: ComponentFixture<PickTeachingCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickTeachingCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickTeachingCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
