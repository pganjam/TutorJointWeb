import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Slot } from '@app/model/slot';
import { AuthenticationService, TutorService } from '@app/service';


@Component({
  selector: 'app-pick-office-hours',
  templateUrl: './pick-office-hours.component.html',
  styleUrls: ['./pick-office-hours.component.css']
})
export class PickOfficeHoursComponent implements OnInit {

  public disableSubmit:boolean = true;

  officeHoursForm: FormGroup | undefined;

  public slots: Array<Slot> = [];

  constructor(private tutorService: TutorService,
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService ) {

    this.officeHoursForm = this.fb.group({});
    this.tutorService.getOfficeHours(this.authenticationService.userId).subscribe((data: any) => {
      this.slots = data;
    });

  }

  selectSlot(slot: Slot) {

    this.disableSubmit = false;
    if (slot.status=="CLOSED") {
      slot.status = "OPEN";
    } else {
      slot.status = "CLOSED";
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.tutorService.updateOfficeHours(this.slots, this.authenticationService.userId).subscribe((data: any) => {
      this.router.navigateByUrl('/officehours');
      this.disableSubmit = true;
    });
    
  }

}
