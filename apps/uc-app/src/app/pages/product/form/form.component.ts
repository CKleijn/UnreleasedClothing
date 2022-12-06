import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import { Category } from '../../category/category.model';
import { CategoryService } from '../../category/category.service';
import { ProductDto } from '../dtos/product.dto';
import { ProductService } from '../product.service';

@Component({
  selector: 'uc-app-form-product',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  paramSubscription: Subscription | undefined;
  createSubscription: Subscription | undefined;
  updateSubscription: Subscription | undefined;
  productId: string | null = null;
  product = new ProductDto();
  error: string | null = null;
  productExists: boolean = false;
  categories$: Observable<Category[]> | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.productId = params.get('productId');

          if (this.productId) {
            this.productExists = true;
            return this.productService.getProductById(this.productId);
          } else {
            return of(new ProductDto());
          }
        })
      ).subscribe((product) => {
        this.product = {
          ...product
        }
      })

    this.categories$ = this.categoryService.getCategories();
  }

  onSubmit(): void {
    if (this.productExists) {
      this.updateSubscription = this.productService.updateProduct(this.productId!, this.product!).subscribe({
        next: () => this.router.navigate(['products', this.productId]),
        error: (error) => this.error = error.message
      })
    }
    else {
      this.createSubscription = this.productService.createProduct(this.product!).subscribe({
        next: () => this.router.navigate(['products']),
        error: (error) => this.error = error.message
      })
    }
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe;
    this.createSubscription?.unsubscribe;
    this.updateSubscription?.unsubscribe;
  }
}
