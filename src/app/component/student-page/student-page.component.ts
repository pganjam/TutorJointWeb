import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { CoursePayload } from '../../model/course-payload';
import { AuthenticationService, CartService } from '@app/service';
import { SendObjectService } from '@app/service/send-object.service';
import { IObject } from '@app/service/IObject';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {
  page = 1;
  pageSize = 9;

  courses = [];
  courses$: Observable<Array<CoursePayload>> | undefined;

  object: IObject;
  
  constructor(private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private objService: SendObjectService) { 

    this.object = {id: '', type: ''};
    this.objService.object.subscribe(object => this.object = object);

  }

  ngOnInit(): void {
    const course_id = this.route.snapshot.paramMap.get("id");
    if(course_id) {
      this.object = {id: course_id, type: 'STUDENT'};
      this.objService.sendObject(this.object);
    } 

    this.studentService.getEnrollments(this.object.id).subscribe((data: any) => {
      this.courses = data;
    });
  }

  get isStudent() {
    return this.authenticationService.isStudent;
  }

  get studentId() {
    return this.authenticationService.userId
  }

}
