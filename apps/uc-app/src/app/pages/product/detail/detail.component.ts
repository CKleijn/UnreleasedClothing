import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../user/user.model';
import { AdviceDto } from '../dtos/advice.dto';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'uc-app-detail-product',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  loggedInUser: User | undefined;
  userSubscription: Subscription | undefined;
  routeSubscription: Subscription | undefined;
  deleteSubscription: Subscription | undefined;
  productId: string | null = null;
  product$: Observable<Product> | undefined;
  advice$: Observable<AdviceDto> | undefined;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.asObservable().subscribe({
      next: (user) => this.loggedInUser = user,
      error: (error) => this.error = error.message
    })
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId');
      this.product$ = this.productService.getProductById(this.productId!);
      this.advice$ = this.productService.getProductAdvice(this.productId!);
    })
  }

  delete(): void {
    this.deleteSubscription = this.productService.deleteProduct(this.productId!).subscribe({
      next: () => this.router.navigate(['products']),
      error: (error) => this.error = error.message
    })
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe;
    this.routeSubscription?.unsubscribe;
    this.deleteSubscription?.unsubscribe;
  }
}
