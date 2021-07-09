import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLOTHING_STORE_API } from 'src/app/app-injections-tokens';
import { ViewCategory } from 'src/models/category/view.category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryApiUrl = this.baseApiUrl + '/api/categories'

  constructor(
    private http: HttpClient, 
    @Inject(CLOTHING_STORE_API) private baseApiUrl: string
  ) { }

  getAllCategories(): Observable<ViewCategory[]> {
    return this.http.get<ViewCategory[]>(this.categoryApiUrl);
  }
}
