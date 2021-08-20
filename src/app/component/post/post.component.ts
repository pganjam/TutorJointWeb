import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../service/post.service';
import { PostPayload } from '../../model/post-payload';
import { DiscussionsComponent } from '../discussions/discussions.component';
import { DiscussionService } from '@app/service/discussion.service';
import { Subscription } from 'rxjs';

// @ts-ignore
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: PostPayload | undefined;
  postId = 0;

  objectId: string = '';

  constructor(private router: ActivatedRoute,
    private postService: PostService,
    private discussionService: DiscussionService) {

  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.postId = params['id'];
    });

    this.discussionService.objectReference.subscribe(objectId => this.objectId = objectId);

    this.discussionService.changeObjectReference('10');

    this.postService.getPost(this.postId).subscribe((data: PostPayload) => {
      this.post = data;
    }, (err: any) => {
      console.log('Failure Response');
    })
  }
}