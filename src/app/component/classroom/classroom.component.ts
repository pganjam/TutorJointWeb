import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscussionService } from '@app/service/discussion.service';
import { IObject } from '@app/service/IObject';
import { SendObjectService } from '@app/service/send-object.service';


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  object: IObject;

  constructor(private route: ActivatedRoute,
    private objService: SendObjectService) { 
    this.object = {id: '', type: ''};
    this.objService.object.subscribe(object => this.object = object);
  }

  get courseId() {
    return this.object.id; 
  }
  
  ngOnInit(): void {
    const course_id = this.route.snapshot.paramMap.get("id");
    if(course_id) {
      this.object = {id: course_id, type: 'CLASS'};
      this.objService.sendObject(this.object);
    } 
  }
}
