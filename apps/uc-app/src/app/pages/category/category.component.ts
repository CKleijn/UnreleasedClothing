import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'uc-app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories$: Observable<Category[]> | undefined;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }
}
