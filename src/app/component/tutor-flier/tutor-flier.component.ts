import { Component, OnInit } from '@angular/core';
import { TutorService } from '../../service/tutor.service';
import { TutorPayload } from '../../model/tutor-payload';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FileUplodVM, CoursePayload } from '../../model/course-payload';
import { AuthenticationService } from '@app/service/authentication.service';
import { CartService } from '@app/service';
import { IObject } from '@app/service/IObject';
import { SendObjectService } from '@app/service/send-object.service';

@Component({
  selector: 'app-tutor-flier',
  templateUrl: './tutor-flier.component.html',
  styleUrls: ['./tutor-flier.component.css']
})
export class TutorFlierComponent implements OnInit {

  private sub: any;
  public instructor: TutorPayload;
  public courses: CoursePayload[];

  tutor_id: string | undefined;
  page = 1;
  pageSize = 12;
  
  object: IObject = {id: '', type: ''};

  constructor(private _tutorService: TutorService,
    private _arouter: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private objectService: SendObjectService,
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

    this.objectService.object.subscribe(object => this.object = object);
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

    if (this.object.id != null) {
      this._tutorService.getTutor(this.object.id).subscribe(
        userData => {
          this.instructor = <TutorPayload>userData;
        }, errorData => {
          console.log("ERROR IN :" + errorData.error.message);
        },
      );

      this._tutorService.getCoursesByTutorId(this.object.id).subscribe(
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



