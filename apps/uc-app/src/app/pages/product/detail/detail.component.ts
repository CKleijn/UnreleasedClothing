import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'uc-app-detail-product',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription | undefined;
  deleteSubscription: Subscription | undefined;
  productId: string | null = null;
  product$: Observable<Product> | undefined;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId');
      this.product$ = this.productService.getProductById(this.productId!);
    })
  }

  delete(): void {
    this.deleteSubscription = this.productService.deleteProduct(this.productId!).subscribe({
      next: () => this.router.navigate(['products']),
      error: (error) => this.error = error.message
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe;
    this.deleteSubscription?.unsubscribe;
  }
}
