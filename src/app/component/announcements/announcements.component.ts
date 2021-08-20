import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AnnouncementService } from '@app/service/announcement.service';
import { NewAnnouncementModalComponent } from './new-announcement-modal/new-announcement-modal.component';

import { AddCourseService, AuthenticationService, StudentService, TutorService } from '@app/service';
import { SendObjectService } from '@app/service/send-object.service';
import { IObject } from '@app/service/IObject';
import { Discussion } from '@app/model/discussion';


@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  object: IObject = { id: '', type: '' };

  //Pagination 
  page = 1;
  pageSize = 5;
  collectionSize = 0;

  //data
  announcements: Discussion[] = [];
  paginateData: any[] = [];

  constructor(private dialog: MatDialog,
    private router: ActivatedRoute,
    private announcementService: AnnouncementService,
    private courseService: AddCourseService,
    private authService: AuthenticationService,
    private objectService: SendObjectService,
    private tutorService: TutorService,
    private studentService: StudentService) {

    this.objectService.object.subscribe(object => this.object = object);
  }

  get showNewButton(): boolean {
    if(this.object.type == "CLASS")
      return true;
    else
      return false;
  }

  ngOnInit(): void {
    if (this.object.type == "TUTOR") {
      this.tutorService.getAnnouncements(this.object.id).subscribe((data: any) => {
        this.announcements = data;
        this.collectionSize = this.announcements.length;
        this.fetchNextPage();
      });
    } else if (this.object.type == "CLASS") {
      this.courseService.getAnnouncements(this.object.id).subscribe((data: any) => {
        console.log(data);
        this.announcements = data;
        this.collectionSize = this.announcements.length;
        this.fetchNextPage();
      });
    } else if (this.object.type == "STUDENT") {
      this.studentService.getAnnouncements(this.object.id).subscribe((data: any) => {
        this.announcements = data;
        this.collectionSize = this.announcements.length;
        this.fetchNextPage();
      });
    }

    

  }

  get courseId() {
    return this.object.id;
  }

  get isTutor() {
    return this.authService.isTutor;
  }

  get isStudent() {
    return this.authService.isStudent;
  }

  //Announcement
  initAnnouncement(): Discussion {
    const announcement: Discussion = {
      id: '',
      party_id: this.authService.userId + '',
      username: '',
      course_id: '1',
      title: '',
      message: '',
      createdOn: new Date(),
      updatedOn: new Date(),
      comments: []  
    };
    return announcement;
  }

  //Remove Announcement
  removeAnnouncement(index: number) {
    let announcement: Discussion = this.announcements[index];
    let announcement_id: string = announcement.id ?? '';

    this.announcementService.deleteAnnouncement(announcement_id).subscribe((result: any) => {
      console.log(result);
    });
    this.announcements.splice(index, 1);

    this.collectionSize = this.collectionSize - 1;
    this.fetchNextPage();
  }

  //Edit Announcement
  editAnnouncement(index: number): void {
    const data: any = { announcement: this.announcements[index], status: 'close' };

    const dialogRef = this.dialog.open(NewAnnouncementModalComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data.status == 'submit') {
        const announcement: Discussion = data.announcement;

        this.announcementService.updateAnnouncement(announcement).subscribe((result: any) => {
          announcement.id = result;
        });
        this.announcements[index] = announcement;
        this.fetchNextPage();

      } else {
        console.log('The dialog was closed');
      }
    });
  }

  //Add Announcement
  openDialog(): void {

    const data: any = { announcement: this.initAnnouncement(), status: 'close' };

    const dialogRef = this.dialog.open(NewAnnouncementModalComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((data: any) => {

      debugger;
      if (data.status == 'submit') {
        const announcement: Discussion = data.announcement;

        announcement.course_id = this.courseId;
        this.announcementService.addAnnouncement(announcement).subscribe((result: any) => {
          announcement.id = result;
        });

        this.announcements.unshift(announcement);
        this.collectionSize = this.collectionSize + 1;
        this.fetchNextPage();

      } else {
        console.log('The dialog was closed');
      }
    });
  }

  fetchNextPage() {

    this.paginateData = this.announcements
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

  }
}



