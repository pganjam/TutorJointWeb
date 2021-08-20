import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDiscussionModalComponent } from './new-discussion-modal.component';

describe('NewDiscussionModalComponent', () => {
  let component: NewDiscussionModalComponent;
  let fixture: ComponentFixture<NewDiscussionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDiscussionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDiscussionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
