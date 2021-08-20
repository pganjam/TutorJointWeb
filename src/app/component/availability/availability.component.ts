import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Slot } from 'src/app/model/slot';
import { TutorService } from 'src/app/service/tutor.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  
  public slots: Array<Slot> | undefined;
  public unavailableSlots: Array<string> = [];
  public selectedSlots: Array<string> = [];
  public selectedObjs: Array<Slot> = [];
  events: string[] = [];

  constructor(private tutorService: TutorService,
    private router: Router) {
      
      this.tutorService.getOfficeHours('3').subscribe((data: any) => {
        this.slots = data;
      });
      
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.unavailableSlots = [];
    this.selectedSlots = [];
    this.selectedObjs = [];

    let date: Date = event.value==null? new Date():event.value;
    date.setHours(0, 0, 0, 0);
    /*
    this.tutorService.getOfficeHours('3').subscribe((data: any) => {
      this.slots = data;
      console.log(this.slots);
    });

    this.tutorService.getOfficeHours('1', date).subscribe((data: any) => {
      let slots: Array<Slot> = data;
      slots.forEach(element => {
        this.unavailableSlots.push(element.value);
      });
    });
    */

  }

  selectSlot(slot: Slot) {
    const index = this.selectedSlots.indexOf(slot.value);
    slot.tutor_id = '1';
    slot.date = this.date.value;
    if (index>=0) { 
      this.selectedSlots.splice(index, 1);
      this.selectedObjs.splice(index, 1);
    } else {
      this.selectedSlots.push(slot.value);
      this.selectedObjs.push(slot);
    }
  }


  ngOnInit(): void {
  }

  submit() {
    this.tutorService.addAppointments(this.selectedObjs, '1').subscribe((data: any) => {
      this.router.navigateByUrl('availability/'+1);
    });
  }

}
