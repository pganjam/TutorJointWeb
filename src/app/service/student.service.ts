import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentPayload} from '../model/student-payload';
import { environment } from '@environments/environment';
import { FileInfo } from '@app/model/file-info';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) {
  }

  register(studentPayload: StudentPayload) {
    return this.httpClient.post(`${environment.apiUrl}/students/`, studentPayload);
  }

  getEnrollments(student_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/enrollments/`+ student_id);
  }

  getEvents(student_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/students/`+ student_id + '/events');
  }
  
  getDiscussions(student_id: string){
    return this.httpClient.get(`${environment.apiUrl}/students/` + student_id + '/discussions');
  }

  getAnnouncements(student_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/students/`+ student_id + '/announcements');
  }

  getFiles(student_id: string): Observable<Array<FileInfo>>{
    return this.httpClient.get<Array<FileInfo>>(`${environment.apiUrl}/students/` + student_id + `/files`);
  }
}
