
import { Router } from '@angular/router';
import { FormGroup, FormControl } from "@angular/forms";
import { StudentPayload } from '../../model/student-payload';
import { StudentService } from '../../service/student.service';
import { AuthenticationService } from '@app/service';
import { Role } from 'src/app/model/role';
import { Component, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators } from "@angular/forms";

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent {

  error: string = '';
  errorFlag: boolean = false;
  registrationInfo: FormGroup;
  values: string[] =['Male', 'Female', 'Other'];
  studentPayload: StudentPayload;

  constructor(private fb: FormBuilder,
    private router: Router,
    private studentService: StudentService,
    private authService: AuthenticationService) {

    this.registrationInfo = this.fb.group({
      'firstName': ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
      'middleName': new FormControl(),
      'lastName': new FormControl(null, Validators.required),
      'gender': new FormControl(null, Validators.required),
      'emailAddress': new FormControl(null, Validators.required),
      'homePhone': new FormControl(),
      'mobilePhone': new FormControl(null, Validators.required),
      'streetAddress1': new FormControl(null, Validators.required),
      'streetAddress2': new FormControl(),
      'city': new FormControl(null, Validators.required),
      'state': new FormControl(),
      'zipCode': new FormControl(null, Validators.required),
      'twitter': new FormControl(null),
      'linkedin': new FormControl(null)
    });

    this.studentPayload = {
      userName: '',
      studentId: '',
      firstName: '',
      lastName: '',
      middleName: '',
      fullName: '',
      homePhone: '',
      mobilePhone: '',
      emailAddress: '',
      streetAddress1: '',
      streetAddress2: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    };
  }

  submit() {
    this.studentPayload = {
      studentId: this.authService.userId,
      userName: this.authService.userName,
      firstName: this.registrationInfo.get('firstName')?.value,
      lastName: this.registrationInfo.get('lastName')?.value,
      middleName: this.registrationInfo.get('middleName')?.value,
      fullName: this.registrationInfo.get('firstName')?.value + " " + this.registrationInfo.get('lastName')?.value,
      homePhone: this.registrationInfo.get('homePhone')?.value,
      mobilePhone: this.registrationInfo.get('mobilePhone')?.value,
      emailAddress: this.registrationInfo.get('emailAddress')?.value,
      streetAddress1: this.registrationInfo.get('streetAddress1')?.value,
      streetAddress2: this.registrationInfo.get('streetAddress2')?.value,
      city: this.registrationInfo.get('city')?.value,
      state: this.registrationInfo.get('state')?.value,
      zipCode: this.registrationInfo.get('zipCode')?.value,
      country: "United States"
    };

    this.studentService.register(this.studentPayload).subscribe(data => {
      this.authService.updateRole(Role.STUDENT);
      this.router.navigateByUrl('/');
    }, error => {
      console.log('Failure Response');
    })
  }

}
