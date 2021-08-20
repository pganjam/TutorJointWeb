import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Message } from '../../../model/message';
import { AnnouncementService } from '../../../service/announcement.service'


@Component({
  selector: 'app-new-announcement-modal',
  templateUrl: './new-announcement-modal.component.html',
  styleUrls: ['./new-announcement-modal.component.css']
})
export class NewAnnouncementModalComponent {

  constructor(
    public dialogRef: MatDialogRef<NewAnnouncementModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onClose() {
    this.data.status='close';
    this.dialogRef.close(this.data);
  }

  onSubmit() {
    this.data.status='submit';
    this.dialogRef.close(this.data);
  }
}
