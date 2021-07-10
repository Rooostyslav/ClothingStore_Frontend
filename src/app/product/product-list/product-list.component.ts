import { Component, OnInit } from '@angular/core';
import { ViewProduct } from 'src/models/product/view.product';
import { AuthService } from 'src/services/auth.service';
import { ProductImageService } from 'src/services/product-image.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  isAdmin: boolean = false;
  products: ViewProduct[] = [];

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private productImageService: ProductImageService
  ) {

  }

  ngOnInit(): void {
    this.getIsAdmin();
    this.getProducts();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  getIsAdmin() {
    if (this.authService.isLoggedIn) {
      this.authService.getAuthUser()
        .subscribe(result => {
          this.isAdmin = result.role == "admin";
        });
    }
  }

  getProducts() {
    this.productService.getAllProducts()
      .subscribe(result => {
        this.products = result;
        this.getImages();
      });
  }

  getImages() {
    for(let product of this.products) {
      if (product.photoIds.length > 0) {
        this.productImageService.getImage(product.photoIds[0])
          .subscribe(result => {
            var reader:FileReader = new FileReader();
            reader.onloadend = (e) => {
              if (reader.result != null) {
                product.image = reader.result.toString();
              }
            }
            reader.readAsDataURL(result);
          });
      }
      else {
        product.image = "";
      }
    }
  }
}
