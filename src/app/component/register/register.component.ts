import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterPayload } from '../../model/register-payload';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { ErrorService } from '@app/service/error.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerPayload: RegisterPayload;
  loading = true;

  constructor(
    private authenticationService: AuthenticationService,
    private errorService: ErrorService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      roles: []
    });

    this.registerPayload = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: []
    }

  }

  ngOnInit() {
  }

  onSubmit() {
    this.registerPayload.username = this.registerForm.get('username')?.value;
    this.registerPayload.email = this.registerForm.get('email')?.value;
    this.registerPayload.password = this.registerForm.get('password')?.value;
    this.registerPayload.confirmPassword = this.registerForm.get('confirmPassword')?.value;
    this.registerPayload.role = ["GUEST"];

    this.authenticationService.signup(this.registerPayload).subscribe(data => {
      this.router.navigateByUrl('/register-success');
    }, err => {
      this.errorService.error = err.error;
      this.router.navigateByUrl('/error');
    });

  }
}