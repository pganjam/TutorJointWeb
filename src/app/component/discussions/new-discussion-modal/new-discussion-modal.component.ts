import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-discussion-modal',
  templateUrl: './new-discussion-modal.component.html',
  styleUrls: ['./new-discussion-modal.component.css']
})
export class NewDiscussionModalComponent {

  constructor(
    public dialogRef: MatDialogRef<NewDiscussionModalComponent>,
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
