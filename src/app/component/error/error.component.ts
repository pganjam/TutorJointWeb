import { Component } from '@angular/core';
import { Error } from '@app/model/error-payload';
import { ErrorService } from '@app/service/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  error: Error;

  constructor(private errorService: ErrorService) { 
    if (this.errorService.error === undefined) {
      this.error = {
        severity: "",
        shortDescription: "",
        longDescription: "",
        code: "",
        category: "",
        source: "",
        description: ""
      }
    } else {
      this.error = this.errorService.error;
    }
  }
}
