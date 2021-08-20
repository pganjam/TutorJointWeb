import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Discussion } from '@app/model/discussion';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  private objectSource = new BehaviorSubject('');
  objectReference = this.objectSource.asObservable();
  
  constructor(private httpClient: HttpClient) {
  }

  changeObjectReference(id: string) {
    this.objectSource.next(id);
  }

  addDiscussion(discussion: Discussion){
    return this.httpClient.post(`${environment.apiUrl}/discussions/`, discussion);
  }

  updateDiscussion(discussion: Discussion){
    return this.httpClient.patch(`${environment.apiUrl}/discussions/`, discussion);
  }

  deleteDiscussion(id: string){
    return this.httpClient.delete(`${environment.apiUrl}/discussions/` + id);
  }

  addComment(discussionId: string, comment: Discussion){
    return this.httpClient.post(`${environment.apiUrl}/discussions/` + discussionId + "/comments/", comment);
  }

  getComments(discussionId: string): Observable<Array<Message>>{
    return this.httpClient.get<Array<Message>>(`${environment.apiUrl}/discussions/comments/` + discussionId);
  }
}
