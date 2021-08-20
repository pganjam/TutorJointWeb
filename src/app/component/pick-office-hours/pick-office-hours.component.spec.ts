import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickOfficeHoursComponent } from './pick-office-hours.component';

describe('PickOfficeHoursComponent', () => {
  let component: PickOfficeHoursComponent;
  let fixture: ComponentFixture<PickOfficeHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickOfficeHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickOfficeHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
