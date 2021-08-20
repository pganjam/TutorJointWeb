import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../model/category-payload';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Array<Category>>{
    return this.httpClient.get<Array<Category>>(`${environment.apiUrl}/categories`);
  }

  updateCategories(categories: Array<Category>, party_id: string) {
    return this.httpClient.post(`${environment.apiUrl}/tutors/` + party_id + `/categories`, categories);
  }
}
