import { Component, OnInit } from '@angular/core';
import { TutorService } from '../../service/tutor.service';
import { TutorPayload } from '../../model/tutor-payload';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FileUplodVM, CoursePayload } from '../../model/course-payload';
import { AuthenticationService } from '@app/service/authentication.service';
import { CartService } from '@app/service';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {
  private sub: any;
  public instructor: TutorPayload;
  public courses: CoursePayload[];

  tutor_id: string | undefined;
  page = 1;
  pageSize = 12;

  constructor(private _tutorService: TutorService,
    private _arouter: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private _httpClient: HttpClient,
    private _router: Router,
    private cartService: CartService) {

    this.courses = [];

    this.instructor = {
      instructorId: '',
      userName: '',
      firstName: '',
      lastName: '',
      middleName: '',
      fullName: '',
      homePhone: '',
      mobilePhone: '',
      emailAddress: '',
      streetAddress1: '',
      streetAddress2: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      education: '',
      educationTxt: '',
      occupation: '',
      occupationTxt: '',
      experience: '',
      experienceTxt: '',
      preference: '',
      taxId: '',
      dob: '',
      courseCount: '',
      description: '',
      avatar: new FileUplodVM()
    };
  }


  get isTutor() {
    return this.authenticationService.isTutor;
  }

  get isStudent() {
    return this.authenticationService.isStudent;
  }

  enroll(course: CoursePayload){
    this.cartService.addItem(course);
  }

  ngOnInit(): void {

    this.sub = this._arouter.params.subscribe(params => {
      this.tutor_id = params['id'];
    });

    if (this.tutor_id != null) {
      this._tutorService.getTutor(this.tutor_id).subscribe(
        userData => {
          this.instructor = <TutorPayload>userData;
        }, errorData => {
          console.log("ERROR IN :" + errorData.error.message);
        },
      );

      this._tutorService.getCoursesByTutorId(this.tutor_id).subscribe(
        (data: any) => {
          this.courses = data;
        }, error => {
          console.log("ERROR IN :" + error.error.message);
        },
      );

    } else {
      console.log("Party ID is null!!");
    }
  }
}

