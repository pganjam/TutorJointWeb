import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventDto } from '@app/model/eventdto';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../model/message';
import { IObject } from './IObject';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  private objectSource = new BehaviorSubject({ id:'', type:'' });
  object = this.objectSource.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  changeObject(obj: IObject) {
    this.objectSource.next(obj);
  }

  addEvent(event: EventDto){
    return this.httpClient.post(`${environment.apiUrl}/events/`, event);
  }

  updateEvent(event: EventDto){
    return this.httpClient.patch(`${environment.apiUrl}/events/`, event);
  }

  deleteEvent(id: string){
    return this.httpClient.delete(`${environment.apiUrl}/events/` + id);
  }

  getEvents(courseId: string): Observable<Array<Message>>{
    return this.httpClient.get<Array<Message>>(`${environment.apiUrl}/events/` + courseId);
  }

  getEventsByTutor(tutorId: string): Observable<Array<Message>>{
    return this.httpClient.get<Array<Message>>(`${environment.apiUrl}/events?tutorId=` + tutorId);
  }

  getEventsForStudent(studentId: string): Observable<Array<Message>>{
    return this.httpClient.get<Array<Message>>(`${environment.apiUrl}/events?studentId=` + studentId);
  }

}
