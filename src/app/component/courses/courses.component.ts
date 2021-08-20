import { Component, OnInit } from '@angular/core';
import { AddCourseService } from '../../service/add-course.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { CoursePayload } from '../../model/course-payload';
import { AuthenticationService, CartService } from '@app/service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  page = 1;
  pageSize = 9;

  courses = [];
  courses$: Observable<Array<CoursePayload>> | undefined;

  constructor(private router: ActivatedRoute, 
              private _r: Router,
              private authenticationService: AuthenticationService,
              private courseService: AddCourseService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.getAllCourses();
  }

  get isTutor() {
    return this.authenticationService.isTutor;
  }

  get isStudent() {
    return this.authenticationService.isStudent;
  }

  onChange(enable: boolean) {
    if (enable) {
      this.getMyCourses();
    } else {
      this.getAllCourses();
    }
  }

  getAllCourses() {
    this.courseService.getCourses().subscribe((data: any) => {
      this.courses = data;
    });
  }

  getMyCourses() {
    this.courseService.getMyCourses().subscribe((data: any) => {
      this.courses = data;
    });
  }

  enroll(course: CoursePayload){
    this.cartService.addItem(course);
  }
}
