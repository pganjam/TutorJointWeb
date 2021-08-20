import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../service/student.service';

import { Observable } from 'rxjs';
import { CoursePayload } from '../../model/course-payload';
import { AuthenticationService, TutorService } from '@app/service';
@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  page = 1;
  pageSize = 9;

  courses = [];
  courses$: Observable<Array<CoursePayload>> | undefined;

  constructor(private authenticationService: AuthenticationService,
              private studentService: StudentService,
              private tutorService: TutorService) {
  }

  ngOnInit() {
    if (this.isStudent)
      this.getEnrollments();
    else
      this.getMyCourses();

  }

  get isStudent() {
    return this.authenticationService.isStudent;
  }

  get userId() {
    return this.authenticationService.userId
  }

  getEnrollments() {
    this.studentService.getEnrollments(this.userId).subscribe((data: any) => {
      this.courses = data;
    });
  }

  getMyCourses() {
    this.tutorService.getCoursesByTutorId(this.userId).subscribe((data: any) => {
      this.courses = data;
    });
  }
}
