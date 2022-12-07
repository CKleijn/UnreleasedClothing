import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from '../user/user.model';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'uc-app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  loggedInUser$: Observable<User | undefined> | undefined;
  categories$: Observable<Category[]> | undefined;

  constructor(private categoryService: CategoryService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
    this.categories$ = this.categoryService.getCategories();
  }
}
