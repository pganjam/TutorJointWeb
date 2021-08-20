import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Enrollment } from '@app/model/enrollment-payload';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient: HttpClient) {
  }

  enroll(enrollments: Enrollment[]){
    return this.httpClient.post(`${environment.apiUrl}/enrollments`, enrollments);
  }

  
}