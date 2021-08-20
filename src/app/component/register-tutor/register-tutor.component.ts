import { Component, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { FormGroup, FormControl } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TutorService } from '../../service/tutor.service';
import { TutorPayload } from '../../model/tutor-payload';
import { FileUplodVM } from 'src/app/model/course-payload';
import { Role } from 'src/app/model/role';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthenticationService } from '@app/service/authentication.service';
import { ErrorService } from '@app/service/error.service';


@Component({
  selector: 'app-register-tutor',
  templateUrl: './register-tutor.component.html',
  styleUrls: ['./register-tutor.component.css']
})

export class RegisterTutorComponent {
  editor = ClassicEditor;

  isLinear = false;
  error = '';
  errorFlag = false;
  url = '';
  values: string[] = ['Male', 'Female', 'Other'];
  selectedEducation: string = '';
  selectedOccupation: string = '';
  selectedExperience: string = '';
  instructionPreference: string = '';
  personalInfo: FormGroup;
  profileInfo: FormGroup;
  educationInfo: FormGroup;
  tutorPayload: TutorPayload;

  educationOptions: string[] = [
    'High School Diploma',
    'Bachelors Degree',
    'Graduate Degree',
    'Post Graduate',
    'Doctorate',
    'Other'
  ];
  occupationOptions: string[] = [
    'Prefer not to say',
    'Current Student',
    'Current Faculty',
    'Technology Professional',
    'Other'
  ];
  experienceOptions: string[] = [
    'None',
    'Few Lessons',
    'Several Lessons',
    'Other',
  ];
  instructionPreferenceOptions: string[] = [
    'In-Person',
    'On-Line',
    'Both'
  ];

  /*########################## File Upload ########################*/
  @ViewChild('fileInput') el: ElementRef | undefined;
  imageUrl: any = 'https://i.ibb.co/fDWsn3G/buck.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;

        this.profileInfo.patchValue({
          fileSource: reader.result
        });

        this.editFile = false;
        this.removeUpload = true;
      }

      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el?.nativeElement.files);
    this.imageUrl = 'https://i.ibb.co/fDWsn3G/buck.jpg';
    this.editFile = true;
    this.removeUpload = false;

    this.profileInfo.patchValue({
      fileSource: [null]
    });
  }

  constructor(private _formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private httpClient: HttpClient,
    private router: Router,
    private tutorService: TutorService,
    private authService: AuthenticationService,
    private errorService: ErrorService) {

    this.personalInfo = this._formBuilder.group({
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
      'zipCode': new FormControl(null, Validators.required)
    });

    this.profileInfo = this._formBuilder.group({
      'description': new FormControl(null, Validators.required),
      'fileSource': ['', Validators.required],
    });

    this.educationInfo = this._formBuilder.group({
      'selectedEducation': new FormControl(null, Validators.required),
      'selectedOccupation': new FormControl(null, Validators.required),
      'selectedExperience': new FormControl(null, Validators.required),
      'educationText': new FormControl(null),
      'occupationText': new FormControl(null),
      'experienceText': new FormControl(null),
      'instructionPreference': new FormControl(null, Validators.required),
      'twitter': new FormControl(null),
      'linkedin': new FormControl(null)
    });

    this.tutorPayload = {
      instructorId: '',
      userName: '',
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
      country: '',
      zipCode: '',
      education: '',
      educationTxt: '',
      occupation: '',
      occupationTxt: '',
      experience: '',
      experienceTxt: '',
      preference: '',
      taxId: '',
      dob: '',
      courseCount: '',
      description: '',
      avatar: new FileUplodVM()
    };
  }

  submit(event) {

    this.tutorPayload = {
      instructorId: this.authService.userId,
      userName: this.authService.userName,
      firstName: this.personalInfo.get('firstName')?.value,
      lastName: this.personalInfo.get('lastName')?.value,
      middleName: this.personalInfo.get('middleName')?.value,
      fullName: this.personalInfo.get('firstName')?.value + " " + this.personalInfo.get('lastName')?.value,
      homePhone: this.personalInfo.get('homePhone')?.value,
      mobilePhone: this.personalInfo.get('mobilePhone')?.value,
      emailAddress: this.personalInfo.get('emailAddress')?.value,
      streetAddress1: this.personalInfo.get('streetAddress1')?.value,
      streetAddress2: this.personalInfo.get('streetAddress2')?.value,
      city: this.personalInfo.get('city')?.value,
      state: this.personalInfo.get('state')?.value,
      zipCode: this.personalInfo.get('zipCode')?.value,
      country: "United States",
      description: this.profileInfo.get('description')?.value,
      education: this.educationInfo.get('selectedEducation')?.value,
      educationTxt: this.educationInfo.get('educationText')?.value,
      occupation: this.educationInfo.get('selectedOccupation')?.value,
      occupationTxt: this.educationInfo.get('occupationText')?.value,
      experience: this.educationInfo.get('selectedExperience')?.value,
      experienceTxt: this.educationInfo.get('experienceText')?.value,
      preference: this.educationInfo.get('instructionPreference')?.value,
      taxId: '',
      dob: '',
      courseCount: '',
      avatar: { name: '', type: '', base64String: this.imageUrl.toString() }
    };


    if(event=='SUBMIT_START_COURSE') {
      this.router.navigateByUrl('/create-course');
    } else if (event=='SUBMIT_START_TUTOR') {
      this.router.navigateByUrl('/availability');
    } else {
      this.tutorService.register(this.tutorPayload).subscribe(data => {
        debugger;
        this.authService.updateRole(Role.TUTOR);
        this.router.navigateByUrl('/');
      }, err => {
        this.errorService.error = err.error;
        this.router.navigateByUrl('/error');
      })
    }


  }
}
