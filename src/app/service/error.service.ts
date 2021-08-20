import { Injectable } from '@angular/core';
import { Error } from '@app/model/error-payload';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error: Error | undefined;

  constructor() { }
}
