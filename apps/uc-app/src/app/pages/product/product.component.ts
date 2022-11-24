import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category/category.service';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'uc-app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.products.forEach(product => {
      product.category.title = this.categoryService.getCategoryById(product.category._id).title;
      product.category.icon = this.categoryService.getCategoryById(product.category._id).icon;
    })
  }
}
