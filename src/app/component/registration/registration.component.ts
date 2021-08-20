import { Component, OnInit } from '@angular/core';

import { User } from '../../model';
import { UserService, AuthenticationService } from '../../service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
  }

  get isTutor() {
    return this.authenticationService.isTutor;
  }

  get isStudent() {
    return this.authenticationService.isStudent;
  }

  get userId() {
    return this.authenticationService.userId;
  }


  ngOnInit() {
  }
}
