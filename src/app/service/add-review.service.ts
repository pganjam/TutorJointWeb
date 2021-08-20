import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import {Observable} from 'rxjs';
import { ReviewPayload } from '../model/review-payload';


@Injectable({
  providedIn: 'root'
})
export class AddReviewService {

  constructor(private httpClient: HttpClient) {
  }

  addReview(coursePayload: ReviewPayload): Observable<Array<ReviewPayload>>{
    return this.httpClient.post<Array<ReviewPayload>>(`${environment.apiUrl}/reviews/`, coursePayload);
  }

  getReviews(): Observable<Array<ReviewPayload>>{
    return this.httpClient.get<Array<ReviewPayload>>(`${environment.apiUrl}/reviews/`);
  }

  getReviewsForTutor(tutorId: string): Observable<Array<ReviewPayload>>{
    return this.httpClient.get<Array<ReviewPayload>>(`${environment.apiUrl}/reviews/tutor/` + tutorId);
  }

  getReview(id: string):Observable<ReviewPayload>{
    return this.httpClient.get<ReviewPayload>(`${environment.apiUrl}/reviews/` + id);
  }

}
