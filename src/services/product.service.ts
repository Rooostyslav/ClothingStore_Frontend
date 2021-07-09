import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLOTHING_STORE_API } from 'src/app/app-injections-tokens';
import { CreateProduct } from 'src/models/product/create.product';
import { ViewProduct } from 'src/models/product/view.product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productApiUrl = this.baseApiUrl + '/api/products'

  constructor(
    private http: HttpClient, 
    @Inject(CLOTHING_STORE_API) private baseApiUrl: string
  ) { }

  getAllProducts(): Observable<ViewProduct[]> {
    return this.http.get<ViewProduct[]>(this.productApiUrl);
  }

  getProductById(productId: number): Observable<ViewProduct> {
    return this.http.get<ViewProduct>(this.productApiUrl + '/' + productId);
  }

  createProduct(product: CreateProduct): Observable<ViewProduct> {
    return this.http.post<ViewProduct>(this.productApiUrl, product);
  }
}
