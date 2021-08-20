import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileDetector } from 'selenium-webdriver';
import { FileInfo } from '@app/model/file-info';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  constructor(private http: HttpClient) { }

  upload(uploadData: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    debugger;
    
    formData.append('file', uploadData.file);
    formData.append('party_id', uploadData.party_id);
    formData.append('course_id', uploadData.course_id);

    const req = new HttpRequest('POST', `${environment.apiUrl}/storage/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(){
    return this.http.get(`${environment.apiUrl}/storage/files`);
  }

  deleteFile(id: number) {
    return this.http.delete(`${environment.apiUrl}/storage/files/` + id);
  }
  
}
