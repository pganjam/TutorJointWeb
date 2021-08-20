import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { PostPayload } from '../../model/post-payload';
import { AuthenticationService } from '@app/service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  page = 1;
  pageSize = 12;
  posts = [];
  
  posts$: Observable<Array<PostPayload>> | undefined;

  constructor(private router: ActivatedRoute,
              public authenticationService: AuthenticationService, 
              private postService: PostService) {
  }

  ngOnInit() {
    this.getAllPosts();
  }

  get isTutor() {
    return this.authenticationService.isTutor;
  }

  get isStudent() {
    return this.authenticationService.isStudent;
  }

  onChange(enable: boolean) {
    if (enable) {
      this.getPostsByUser('pg78');
    } else {
      this.getAllPosts();
    }
  }

  getAllPosts() {
    this.postService.getPosts().subscribe((data: any) => {
      this.posts = data;
    });
  }

  getPostsByUser(username: string) {
    this.postService.getPostsByUser(username).subscribe((data: any) => {
      this.posts = data;
    });
  }
}
