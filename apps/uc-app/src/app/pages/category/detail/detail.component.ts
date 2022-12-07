import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { Product } from '../../product/product.model';
import { User } from '../../user/user.model';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'uc-app-detail-category',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  loggedInUser$: Observable<User | undefined> | undefined;
  routeSubscription: Subscription | undefined;
  categorySubscription: Subscription | undefined;
  productsSubscription: Subscription | undefined;
  deleteSubscription: Subscription | undefined;
  categoryId: string | null = null;
  category: Category | undefined;
  products: Product[] | undefined;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId');
      this.categorySubscription = this.categoryService.getCategoryById(this.categoryId!).subscribe({
        next: (category) => {
          this.category = category;
          this.productsSubscription = this.categoryService.getProductsByCategory(this.categoryId!).subscribe({
            next: (products) => this.products = products,
            error: (error) => this.error = error.message
          })
        },
        error: (error) => this.error = error.message
      })
    })
  }

  delete(): void {
    this.deleteSubscription = this.categoryService.deleteCategory(this.categoryId!).subscribe({
      next: () => this.router.navigate(['categories']),
      error: (error) => this.error = error.message
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe;
    this.categorySubscription?.unsubscribe;
    this.productsSubscription?.unsubscribe;
    this.deleteSubscription?.unsubscribe;
  }
}
