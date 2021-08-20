import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Discussion } from '@app/model/discussion';
import { FileInfo } from '@app/model/file-info';
import { environment } from '@environments/environment';
import {Observable} from 'rxjs';
import { CoursePayload } from '../model/course-payload';
import { TutorPayload } from '../model/tutor-payload';

@Injectable({
  providedIn: 'root'
})
export class AddCourseService {

  constructor(private httpClient: HttpClient) {
  }

  addCourse(coursePayload: CoursePayload){
    return this.httpClient.post(`${environment.apiUrl}/courses/`, coursePayload);
  }

  getCourses(): Observable<Array<CoursePayload>>{
    return this.httpClient.get<Array<CoursePayload>>(`${environment.apiUrl}/courses/`);
  }

  getMyCourses(): Observable<Array<CoursePayload>>{
    return this.httpClient.get<Array<CoursePayload>>(`${environment.apiUrl}/courses/my`);
  }

  getCourse(id: string):Observable<CoursePayload>{
    return this.httpClient.get<CoursePayload>(`${environment.apiUrl}/courses/` + id);
  }

  getTutor(id: string):Observable<TutorPayload>{
    return this.httpClient.get<TutorPayload>(`${environment.apiUrl}/tutors/` + id);
  }

  getDiscussions(course_id: string):Observable<Discussion>{
    return this.httpClient.get<Discussion>(`${environment.apiUrl}/courses/` + course_id + '/discussions');
  }

  getAnnouncements(course_id: string):Observable<Discussion>{
    return this.httpClient.get<Discussion>(`${environment.apiUrl}/courses/` + course_id + '/announcements');
  }

  getFiles(tutor_id: string): Observable<Array<FileInfo>>{
    return this.httpClient.get<Array<FileInfo>>(`${environment.apiUrl}/tutors/` + tutor_id + `/files`);
  }

}
