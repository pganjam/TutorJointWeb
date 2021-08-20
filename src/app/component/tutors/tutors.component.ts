import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TutorPayload } from '../../model/tutor-payload';
import { TutorService } from '../../service/tutor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css']
})
export class TutorsComponent implements OnInit {
  page = 1;
  pageSize = 12;
  instructors = [];
  instructors$!: Observable<Array<TutorPayload>>;

  constructor(private _httpClient: HttpClient,
    private _tutorService: TutorService) { }

  ngOnInit(): void {
    this._tutorService.getAllTutors().subscribe(
      (data: any) => {
        this.instructors = data;
      }, error => {
        console.log("ERROR IN :" + error.error.message);
      },
    );
  }
}
