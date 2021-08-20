import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventService } from '@app/service/event.service';
import { ActivatedRoute } from '@angular/router';
import { EventDto } from '@app/model/eventdto';
import { AuthenticationService, StudentService, TutorService } from '@app/service';
import { SendObjectService } from '@app/service/send-object.service';
import { IObject } from '@app/service/IObject';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  object: IObject = { id: '', type: '' };

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  get courseId() {
    return this.object.id;
  }

  dtos: EventDto[] = [];

  //data
  constructor(private modal: NgbModal,
    private eventService: EventService,
    private tutorService: TutorService,
    private studentService: StudentService,
    private authService: AuthenticationService,
    private router: ActivatedRoute,
    private objectService: SendObjectService) {

    this.objectService.object.subscribe(object => this.object = object);
  }

  ngOnInit(): void {

    if (this.object.type == 'COURSE') {
      this.eventService.getEvents(this.object.id).subscribe((data: any) => {
        console.log(data);
        this.dtos = data;
        
        var obj: Array<any> = [];
        for (var i = 0; i < this.dtos.length; i++) {
          var event: Object = {
            course_id: this.dtos[i]['course_id'],
            id: this.dtos[i]['id'],
            title: this.dtos[i]['title'],
            color: colors.red,
            start: new Date(this.dtos[i]['start'] ?? startOfDay(new Date())),
            end: new Date(this.dtos[i]['end'] ?? startOfDay(new Date())),
          }
          obj.push(event)
        }

        this.events = obj;
        this.refresh.next();
      });
    } else if (this.object.type == 'TUTOR') {
      this.tutorService.getEvents(this.object.id).subscribe((data: any) => {
        this.dtos = data;

        var obj: Array<any> = [];
        for (var i = 0; i < this.dtos.length; i++) {
          var event: Object = {
            course_id: this.dtos[i]['course_id'],
            id: this.dtos[i]['id'],
            title: this.dtos[i]['title'],
            color: colors.red,
            start: new Date(this.dtos[i]['start'] ?? startOfDay(new Date())),
            end: new Date(this.dtos[i]['end'] ?? startOfDay(new Date())),
          }
          obj.push(event)
        }

        this.events = obj;
        this.refresh.next();
      });
    } else if (this.object.type == 'STUDENT') {
      this.studentService.getEvents(this.object.id).subscribe((data: any) => {
        console.log(data);
        this.dtos = data;
        
        var obj: Array<any> = [];
        for (var i = 0; i < this.dtos.length; i++) {
          var event: Object = {
            course_id: this.dtos[i]['course_id'],
            id: this.dtos[i]['id'],
            title: this.dtos[i]['title'],
            color: colors.red,
            start: new Date(this.dtos[i]['start'] ?? startOfDay(new Date())),
            end: new Date(this.dtos[i]['end'] ?? startOfDay(new Date())),
          }
          obj.push(event)
        }

        this.events = obj;
        this.refresh.next();
      });
    } else {
      console.log('Unknown Object Type');
    }

    debugger;

  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {

    const event: CalendarEvent = {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    };

    this.events.push(event);
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    const id: any = eventToDelete.id ?? '';
    this.eventService.deleteEvent(id).subscribe((result: any) => {
      console.log(result);
    });

    this.events = this.events.filter((event) => event !== eventToDelete);

  }

  commitEvent(event: CalendarEvent) {

    const dto: EventDto = {
      id: '',
      course_id: this.object.id,
      tutor_id: '',
      student_id: '',
      start: event.start,
      end: event.end,
      title: event.title
    };

    this.eventService.addEvent(dto).subscribe((result: any) => {
      event.id = result;
    });

  }


  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  get isTutor() {
    return this.authService.isTutor;
  }

  get isStudent() {
    return this.authService.isStudent;
  }

}
