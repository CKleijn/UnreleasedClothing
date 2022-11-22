import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../category/category.model';
import { CategoryService } from '../../category/category.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'uc-app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productId: string | null = null;
  productName: string | null = null;
  productExists: boolean = false;
  product: Product | undefined;
  categories: Category[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId');

      if (this.productId) {
        this.productExists = true;
        this.product = {
          ...this.productService.getProductById(Number(this.productId))
        }
        this.productName = '(' + this.product.brand + ') ' + this.product.name;
      } 
      else {
        this.product = new Product();
        this.product._id = this.productService.getNewIndex();
      }

      this.categories = this.categoryService.getCategories();
    })
  }

  onSubmit(): void {
    if (this.productExists) {
      this.productService.updateProduct(Number(this.productId), this.product!);
    } 
    else {
      this.productService.createProduct(this.product!);
    }

    this.router.navigate(['products'])
  }
}
