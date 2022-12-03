import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of, Subscription, switchMap } from 'rxjs';
import { CategoryDto } from '../category.dto';
import { CategoryService } from '../category.service';

@Component({
  selector: 'uc-app-form-category',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  paramSubscription: Subscription | undefined;
  createSubscription: Subscription | undefined;
  updateSubscription: Subscription | undefined;
  categoryId: string | null = null;
  category = new CategoryDto();
  categoryExists: boolean = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.categoryId = params.get('categoryId');

          if (this.categoryId) {
            this.categoryExists = true;
            return this.categoryService.getCategoryById(this.categoryId);
          } else {
            return of(new CategoryDto());
          }
        })
      ).subscribe((category) => {
        this.category = {
          ...category
        }
      })
  }

  onSubmit(): void {
    if (!this.categoryId) {
      this.createSubscription = this.categoryService.createCategory(this.category).subscribe({
        next: () => this.router.navigate(['categories']),
        error: (error) => this.error = error.message
      })
    } else {
      this.updateSubscription = this.categoryService.updateCategory(this.categoryId, this.category).subscribe({
        next: () => this.router.navigate(['categories']),
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
