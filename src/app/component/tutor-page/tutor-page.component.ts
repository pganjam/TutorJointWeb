import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IObject } from '@app/service/IObject';
import { SendObjectService } from '@app/service/send-object.service';

@Component({
  selector: 'app-tutor-page',
  templateUrl: './tutor-page.component.html',
  styleUrls: ['./tutor-page.component.css']
})
export class TutorPageComponent implements OnInit {
  object: IObject;
  
  constructor(private route: ActivatedRoute,
    private objService: SendObjectService) { 
    this.object = {id: '', type: ''};
    this.objService.object.subscribe(object => this.object = object);
  }

  ngOnInit(): void {
    const tutor_id = this.route.snapshot.paramMap.get("id");
    if(tutor_id) {
      this.object = {id: tutor_id, type: 'TUTOR'};
      this.objService.sendObject(this.object);
    } 
  }

  get tutorId() {
    return this.object.id; 
  }
}

