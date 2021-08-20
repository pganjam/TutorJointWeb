import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IObject } from '../service/IObject';

@Injectable({
  providedIn: 'root'
})
export class SendObjectService {

  private objectSource = new BehaviorSubject({id: '', type: ''});
  object = this.objectSource.asObservable();
  
  constructor(private httpClient: HttpClient) {
  }

  sendObject(id: IObject) {
    this.objectSource.next(id);
  }

}
