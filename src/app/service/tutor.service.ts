import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TutorPayload} from '../model/tutor-payload';
import { environment } from '@environments/environment';
import { Slot } from '../model/slot';
import { Observable } from 'rxjs';
import { Category } from '@app/model';
import { FileInfo } from '@app/model/file-info';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  constructor(private httpClient: HttpClient) {
  }

  register(tutorPayload: TutorPayload){
    return this.httpClient.post(`${environment.apiUrl}/tutors/`, tutorPayload);
  }

  getAllTutors(){
    return this.httpClient.get(`${environment.apiUrl}/tutors`);
  }

  getTutor(tutor_id: string){
    return this.httpClient.get(`${environment.apiUrl}/tutors/` + tutor_id);
  }

  getCoursesByTutorId(tutor_id: string){
    return this.httpClient.get(`${environment.apiUrl}/courses/tutor/` + tutor_id);
  }

  getAnnouncements(tutor_id: string){
    return this.httpClient.get(`${environment.apiUrl}/tutors/` + tutor_id + '/announcements');
  }

  getEvents(tutor_id: string){
    return this.httpClient.get(`${environment.apiUrl}/tutors/` + tutor_id + '/events');
  }

  getDiscussions(tutor_id: string){
    return this.httpClient.get(`${environment.apiUrl}/tutors/` + tutor_id + '/discussions');
  }

  getOfficeHours(tutor_id: string){
    debugger;
    return this.httpClient.get(`${environment.apiUrl}/tutors/` + tutor_id + `/office-hours`);
  }

  updateOfficeHours(officeHours: Array<Slot>, tutor_id: string){
    return this.httpClient.post(`${environment.apiUrl}/tutors/` + tutor_id + `/office-hours`, officeHours);
  }


  getCategories(tutor_id: string): Observable<Array<Category>>{
    debugger;
    return this.httpClient.get<Array<Category>>(`${environment.apiUrl}/tutors/` + tutor_id + `/categories`);
  }

  getFiles(tutor_id: string): Observable<Array<FileInfo>>{
    return this.httpClient.get<Array<FileInfo>>(`${environment.apiUrl}/tutors/` + tutor_id + `/files`);
  }


  getAvailability(tutorId: string, date: Date){
    debugger;
    return this.httpClient.post(`${environment.apiUrl}/tutors/` + tutorId + `/availability?date=`, date);
  }

  addAppointments(appointments: Array<Slot>, tutor_id: string){
    debugger;
    return this.httpClient.post(`${environment.apiUrl}/tutors/` + tutor_id + `/appointments`, appointments);
  }

}