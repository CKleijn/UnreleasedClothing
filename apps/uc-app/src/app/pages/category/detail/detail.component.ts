import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'uc-app-detail-category',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription | undefined;
  deleteSubscription: Subscription | undefined;
  categoryId: string | null = null;
  category$: Observable<Category> | undefined;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId');
      this.category$ = this.categoryService.getCategoryById(this.categoryId!);
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
    this.deleteSubscription?.unsubscribe;
  }
}
