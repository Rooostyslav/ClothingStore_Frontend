import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewProduct } from 'src/models/product/view.product';
import { AuthService } from 'src/services/auth.service';
import { ProductImageService } from 'src/services/product-image.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  isAdmin: boolean = false;
  product: ViewProduct = {
    id: 0,
    name: '',
    description: '',
    categoryId: 0,
    category: '',
    isActive: false,
    price: 0,
    photoIds: [],
    photos: []
  };

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private productService: ProductService,
    private productImageService: ProductImageService
  ) { 
    route.params.subscribe(p => {
      this.product.id = +p['id'];
    });
  }

  ngOnInit(): void {
    this.getIsAdmin();
    this.getProduct();
  }

  getIsAdmin() {
    if (this.authService.isLoggedIn) {
      this.authService.getAuthUser()
        .subscribe(result => {
          this.isAdmin = result.role == "admin";
        });
    }
  }

  getProduct() {
    this.productService.getProductById(this.product.id)
      .subscribe(result => {
        this.product = result;
        this.getImages();

        console.log(result);
      });
  }

  getImages() {
    if (this.product.photoIds.length > 0) {
      this.product.photos = [];
      for(let photoId of this.product.photoIds) {
        this.productImageService.getImage(photoId)
          .subscribe(result => {
            var reader:FileReader = new FileReader();
            reader.onloadend = (e) => {
              if (reader.result != null) {
                this.product.photos.push(reader.result.toString());
              }
            }
            reader.readAsDataURL(result);
          });
      }
    }
  }

  addToShoppingCard(productId: number) {
    
  }
}
