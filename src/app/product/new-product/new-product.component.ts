import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewCategory } from 'src/models/category/view.category';
import { CreateProduct } from 'src/models/product/create.product';
import { CategoryService } from 'src/services/category.service';
import { FileService } from 'src/services/common/file.service';
import { ProductImageService } from 'src/services/product-image.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  
  categories: ViewCategory[] = [];
  images: string[] = [];
  productId: number | undefined;
  product: CreateProduct = {
    name: '',
    categoryId: 0,
    description: '',
    isActive: false,
    price: 0
  }

  constructor(
    private productService: ProductService,
    private productImageService: ProductImageService,
    private categoryService: CategoryService,
    private fileService: FileService
  ) {
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories()
      .subscribe(result => {
        this.categories = result;
      });
  }

  changeListener(event: any) : void {
    this.readImage(event.target);
  }
  
  readImage(inputValue: any): void {
    var file:File = inputValue.files[0];
    var extension = file.name.split('.')[1];

    if (!this.fileService.availableExtensionForImage(extension)) {
      alert("Invalid file extension!");
      return;
    }

    var reader:FileReader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result != null) {
        this.images.push(reader.result.toString());
      }
    }
    reader.readAsDataURL(file);
  }

  removeImage(image: string) {
    this.images = this.images.filter((value, index, arr) => {
      console.log(value);
      return arr.indexOf(value) > -1
    });
  }

  uploadPhoto(file: File) {
    if (this.productId != undefined)
    this.productImageService.uploadImage(this.productId, file)
      .subscribe(result => {
        console.log("Success upload " + file.name + ' !');
      });
  }

  uploadPhotos() {
    var counter = 0;
    for(let image of this.images) {
      var file = this.fileService.dataURLtoFile(image, "image");
      this.uploadPhoto(file);
      counter++;
      console.log(counter + '/' + this.images.length);
    }
  }

  onSubmit() {
    this.productService.createProduct(this.product)
      .subscribe(result => {
        this.productId = result.id;
        this.uploadPhotos();
      });
  }
}
