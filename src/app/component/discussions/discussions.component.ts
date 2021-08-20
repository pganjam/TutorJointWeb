import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddCourseService } from '@app/service/add-course.service';
import { NewDiscussionModalComponent } from './new-discussion-modal/new-discussion-modal.component';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, StudentService, TutorService } from '@app/service';
import { IObject } from '@app/service/IObject';
import { SendObjectService } from '@app/service/send-object.service';
import { Discussion } from '@app/model/discussion';
import { DiscussionService } from '@app/service/discussion.service';


@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {
  //Pagination 
  page = 1;
  pageSize = 3;
  collectionSize = 0;

  selectedDiscussionIndex: number = 0;
  selectedDiscussion!: Discussion;

  objectId: string = '';
  discussions: Discussion[] = [];
  comments: Discussion[] = [];
  paginateData: any[] = [];
  commentsForm: FormGroup;

  object: IObject = { id: '', type: '' };

  constructor(private dialog: MatDialog,
    private courseService: AddCourseService,
    private discussionService: DiscussionService,
    private objectService: SendObjectService,
    private tutorService: TutorService,
    private studentService: StudentService,
    private authService: AuthenticationService) {
    
    this.commentsForm = new FormGroup({
      'comments': new FormControl(null, Validators.required)
    });

    this.objectService.object.subscribe(object => this.object = object);
    this.objectId = this.object.id;
  }

  get showNewButton(): boolean {
    if(this.object.type == "CLASS")
      return true;
    else
      return false;
  }

  get userName() {
    return this.authService.userName;
  }

  get isTutor() {
    return this.authService.isTutor;
  }

  get isStudent() {
    return this.authService.isStudent;
  }

  fetchNextPage() {
    this.paginateData = this.discussions
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit() {
    if (this.object.type == "TUTOR") {
      this.tutorService.getDiscussions(this.objectId).subscribe((data: any) => {
        this.discussions = data;
        this.collectionSize = this.discussions.length;
        this.fetchNextPage();
      });
    } else if (this.object.type == "CLASS") {
      this.courseService.getDiscussions(this.objectId).subscribe((data: any) => {
        this.discussions = data;
        this.collectionSize = this.discussions.length;
        this.fetchNextPage();
      });
    } else if (this.object.type == "STUDENT") {
      this.studentService.getDiscussions(this.objectId).subscribe((data: any) => {
        this.discussions = data;
        this.collectionSize = this.discussions.length;
        this.fetchNextPage();
      });
    }
  }

  //Announcement
  initDiscussion(): Discussion {
    const discussion: Discussion = {
      id: '',
      party_id: this.authService.userId + '',
      username: this.userName,
      course_id: '1',
      title: '',
      message: '',
      createdOn: new Date(),
      updatedOn: new Date(),
      comments: []
    };

    return discussion;
  }

  //Remove Discussion
  removeDiscussion(index: number) {
    let data: Discussion = this.discussions[index];
    let discussion_id: string = data.id ?? '';
    this.discussionService.deleteDiscussion(discussion_id).subscribe((result: any) => {
      console.log(result);
    });
    this.discussions.splice(index, 1);
    this.collectionSize = this.collectionSize - 1;
    this.fetchNextPage();
  }


  //Edit Discussion
  editDiscussion(index: number): void {
    const data: any = { discussion: this.discussions[index], status: 'close' };
    const dialogRef = this.dialog.open(NewDiscussionModalComponent, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data.status == 'submit') {
        const discussion: Discussion = data.discussion;
        this.discussionService.updateDiscussion(discussion).subscribe((result: any) => {
          discussion.id = result;
        });
        this.discussions[index] = discussion;
        this.fetchNextPage();
      } else {
        console.log('The dialog was closed');
      }
    });
  }

  //Add Discussion
  openDialog(): void {
    const data: any = { discussion: this.initDiscussion(), status: 'close' };
    const dialogRef = this.dialog.open(NewDiscussionModalComponent, {
      width: '500px',
      data: data
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data.status == 'submit') {
        const discussion: Discussion = data.discussion;
        this.discussionService.addDiscussion(discussion).subscribe((result: any) => {
          discussion.id = result;
        });
        this.discussions.unshift(discussion);
        this.collectionSize = this.collectionSize + 1;
        this.fetchNextPage();
      } else {
        console.log('The dialog was closed');
      }
    });
  }

  getComments(index: number) {
    this.selectedDiscussionIndex = index;
    this.selectedDiscussion = this.discussions[index];
    this.comments = this.selectedDiscussion.comments;

  }

  onSubmit() {
    const reply: Discussion = {
      id: '',
      party_id: this.authService.userId + '',
      username: this.userName,
      course_id: this.selectedDiscussion.course_id,
      title: '',
      message: this.commentsForm.controls['comments'].value,
      createdOn: new Date(),
      updatedOn: new Date(),
      comments: []
    };

    if(this.selectedDiscussion.id != undefined)
      this.discussionService.addComment(this.selectedDiscussion.id, reply).subscribe((result: any) => {
        reply.id = result;
      });

    this.comments.push(reply);

    this.commentsForm.reset();
    this.commentsForm.controls['reply'].setErrors(null);
  }
}
