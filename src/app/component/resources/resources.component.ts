import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../service/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileInfo } from '@app/model/file-info';
import { MatTableDataSource } from '@angular/material/table';
import { IObject } from '@app/service/IObject';
import { SendObjectService } from '@app/service/send-object.service';
import { AddCourseService, AuthenticationService, StudentService, TutorService } from '@app/service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent {

  _displayedColumns = ['name', 'username', 'courseId', 'type', 'size', 'lastModified', 'download'];
  dataSource: any;

  objectId: string = '';
  object: IObject = { id: '', type: '' };
  fileInfos: FileInfo[] = [];
  files: any[] = [];
  progressInfos: any[] = [];
  message = '';

  constructor(private uploadService: UploadFileService,
              private objectService: SendObjectService,
              private studentService: StudentService,
              private tutorService: TutorService,
              private courseService: AddCourseService,
              private authService: AuthenticationService) { 
    this.objectService.object.subscribe(object => this.object = object);
    this.objectId = this.object.id;
  }

  get showNewButton(): boolean {
    if(this.object.type == "CLASS")
      return true;
    else
      return false;
  }

  selectFiles(event) {
    this.progressInfos = [];
    this.files = [];
    for (let index = 0; index < event.length; index++) {
      let file: File = event.item(index);
      this.files.push(file);
      this.progressInfos.push({ value: index, fileName: file.name })
    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
    this.progressInfos.splice(index, 1);
  }

  uploadFiles() {
    let length = this.files.length;
    for (let index = 0; index < length; index++) {
      this.upload(index, this.files[index]);
    }
  }

  deleteFile(index: number) {
    debugger;
    let file: FileInfo = this.fileInfos[index];
    this.uploadService.deleteFile(file.id).subscribe((data: any) => {
      this.fileInfos.splice(index, 1);
      this.dataSource = new MatTableDataSource<FileInfo>(this.fileInfos);
    })
  }

  upload(idx, file) {
    const uploadData: any = {
      file: file,
      party_id: this.authService.userId,
      course_id: this.objectId
    }
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    this.uploadService.upload(uploadData).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = event.total ? (Math.round(100 * event.loaded / event.total)) : 0;
        } else if (event instanceof HttpResponse) {
          this.uploadService.getFiles().subscribe((data: any) => {
            this.fileInfos = data;
            this.dataSource = new MatTableDataSource<FileInfo>(this.fileInfos);
          });
        }
      },
      error: (err: any) => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;

      }
    });
  }

  ngOnInit() {
    if (this.object.type == "TUTOR") {
      this.tutorService.getFiles(this.objectId).subscribe((data: any) => {
        this.fileInfos = data;
        this.dataSource = new MatTableDataSource<FileInfo>(this.fileInfos);
      });
    } else if (this.object.type == "CLASS") {
      this.courseService.getFiles(this.objectId).subscribe((data: any) => {
        this.fileInfos = data;
        this.dataSource = new MatTableDataSource<FileInfo>(this.fileInfos);
      });
    } else if (this.object.type == "STUDENT") {
      this.studentService.getFiles(this.objectId).subscribe((data: any) => {
        debugger;
        this.fileInfos = data;
        this.dataSource = new MatTableDataSource<FileInfo>(this.fileInfos);
      });
    }
  }

}
