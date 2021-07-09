import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CLOTHING_STORE_API } from 'src/app/app-injections-tokens';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  private imageApiUrl = this.baseApiUrl + '/api/photos/products/'

  constructor(
    private http: HttpClient, 
    @Inject(CLOTHING_STORE_API) private baseApiUrl: string
  ) { }

  uploadImage(productId: number, image: File) {
    let formData = new FormData();
    formData.append('file', image);
    return this.http.post(this.imageApiUrl + productId, formData);
  }

  getImage(photoId: number) {
    return this.http.get(this.imageApiUrl + photoId, { responseType: 'blob' });
  }
}
