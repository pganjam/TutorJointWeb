import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostPayload} from '../model/post-payload';
import {Observable} from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) {
  }

  addPost(postPayload: PostPayload){
    return this.httpClient.post(`${environment.apiUrl}/posts/`, postPayload);
  }

  getPosts(): Observable<Array<PostPayload>>{
    return this.httpClient.get<Array<PostPayload>>(`${environment.apiUrl}/posts`);
  }

  getPostsByUser(username: string): Observable<Array<PostPayload>>{
    return this.httpClient.get<Array<PostPayload>>(`${environment.apiUrl}posts/user/` + username);
  }

  getPost(permaLink: Number):Observable<PostPayload>{
    return this.httpClient.get<PostPayload>(`${environment.apiUrl}/posts/` + permaLink);
  }
}