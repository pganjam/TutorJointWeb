import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Discussion } from '@app/model/discussion';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../model/message';
import { IObject } from './IObject';


@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private objectSource = new BehaviorSubject({ id:'', type:'' });
  object = this.objectSource.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  changeObject(obj: IObject) {
    this.objectSource.next(obj);
  }

  addAnnouncement(announcement: Discussion){
    return this.httpClient.post(`${environment.apiUrl}/announcements/`, announcement);
  }

  updateAnnouncement(announcement: Discussion){
    return this.httpClient.patch(`${environment.apiUrl}/announcements/`, announcement);
  }

  deleteAnnouncement(id: string){
    return this.httpClient.delete(`${environment.apiUrl}/announcements/` + id);
  }

  getAnnouncements(courseId: string): Observable<Array<Discussion>>{
    return this.httpClient.get<Array<Discussion>>(`${environment.apiUrl}/announcements/` + courseId);
  }

  getAnnouncementsByTutor(tutorId: string): Observable<Array<Message>>{
    return this.httpClient.get<Array<Message>>(`${environment.apiUrl}/announcements?tutorId=` + tutorId);
  }

  getAnnouncementsForStudent(studentId: string): Observable<Array<Message>>{
    return this.httpClient.get<Array<Message>>(`${environment.apiUrl}/announcements?studentId=` + studentId);
  }

}
