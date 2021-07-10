import { Component, OnInit } from '@angular/core';
import { CreateCategory } from 'src/models/category/create.category';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  category: CreateCategory = {
    name: ''
  };

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.categoryService.createCategory(this.category)
      .subscribe(result => {
        console.log(result);
      });
  }

}
