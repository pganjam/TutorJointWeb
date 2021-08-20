import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AddCourseService } from '../../service/add-course.service';
import { AddReviewService } from '../../service/add-review.service';

import { CoursePayload } from '../../model/course-payload';
import { TutorPayload } from '../../model/tutor-payload';
import { ReviewPayload } from '../../model/review-payload';
import { CartService } from '../../service/cart.service';
import { AuthenticationService } from '@app/service';
import { IObject } from '@app/service/IObject';
import { SendObjectService } from '@app/service/send-object.service';
@Component({
  selector: 'app-course-flier',
  templateUrl: './course-flier.component.html',
  styleUrls: ['./course-flier.component.css']
})
export class CourseFlierComponent implements OnInit {
  course: CoursePayload;
  tutor: TutorPayload | undefined;
  reviews: ReviewPayload[] | undefined;
  addReviewForm: FormGroup;
  reviewPayload: ReviewPayload;

  object: IObject = { id: '', type: '' };

  constructor(private router: ActivatedRoute,
    private _r: Router,
    private courseService: AddCourseService,
    private reviewService: AddReviewService,
    private cartService: CartService,
    private authenticationService: AuthenticationService,
    private objectService: SendObjectService,
    public fb: FormBuilder) {

    this.course = new CoursePayload();

    this.objectService.object.subscribe(object => this.object = object);

    this.addReviewForm = this.fb.group({
      notes: null,
      tutor: null,
      course: null
    });

    this.reviewPayload = {
      id: '',
      rating: 0,
      notes: '',
      itemId: '',
      reviewerId: '',
      itemCategory: ''
    }
  }

  ngOnInit() {
    this.courseService.getCourse(this.object.id).subscribe((data: CoursePayload) => {
      this.course = data;

      this.getTutor();
      this.getReviewsForTutor();
    }, (err: any) => {
      console.log('Failure Response');
    });
  }

  get courseId() {
    return this.object.id;
  }

  get isTutor() {
    return this.authenticationService.isTutor;
  }

  get isStudent() {
    return this.authenticationService.isStudent;
  }

  public ratingMessage(ratingName: string) {

    let messages: { [key: string]: any[] } = {};

    messages['tutor'] = [
      `${this.tutor?.fullName} was gross!`,
      `${this.tutor?.fullName} was pretty bad.`,
      `${this.tutor?.fullName} was acceptable.`,
      `${this.tutor?.fullName} was pretty good.`,
      `${this.tutor?.fullName} was great!`
    ];

    messages['course'] = [
      `${this.course?.title} was gross!`,
      `${this.course?.title} was pretty bad.`,
      `${this.course?.title} was acceptable.`,
      `${this.course?.title} was pretty good.`,
      `${this.course?.title} was great!`
    ];

    return messages[ratingName];
  }

  getTutor() {
    this.courseService.getTutor(this.course?.tutor_id).subscribe((data: TutorPayload) => {
      this.tutor = data;
    }, (err: any) => {
      console.log('Failure Response');
    });

  }

  addReview() {
    //Course Review
    this.reviewPayload.notes = this.addReviewForm.get('notes')?.value;
    this.reviewPayload.rating = this.addReviewForm.get('course')?.value;
    this.reviewPayload.itemId = this.course?.tutor_id
    this.reviewPayload.itemCategory = 'I';

    this.reviewService.addReview(this.reviewPayload).subscribe((data: ReviewPayload[]) => {
      this.reviews = data;

    }, (err: any) => {
      console.log('Failure Response');
    });

    this.addReviewForm.reset();
  }

  getReviewsForTutor() {
    this.reviewService.getReviewsForTutor(this.course?.tutor_id).subscribe((data: ReviewPayload[]) => {
      this.reviews = data;

    }, (err: any) => {
      console.log('Failure Response');
    });

  }

  enroll() {
    this.cartService.addItem(this.course);
  }
}
