import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'uc-app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryId: string | null = null;
  categoryTitle: string | null = null;
  category: Category | undefined;
  categoryExists: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId');

      if(this.categoryId) {
        this.category = {
          ...this.categoryService.getCategoryById(Number(this.categoryId))
        }
        this.categoryExists = true;
        this.categoryTitle = this.category.title;
      } else {
        this.category = new Category();
        this.category._id = this.categoryService.getNewIndex();
      }
    })
  }

  onSubmit(): void {
    if(this.categoryExists) {
      this.categoryService.updateCategory(Number(this.categoryId), this.category!);
    } else {
      this.category!.createdAt = new Date();
      this.categoryService.createCategory(this.category!);
    }

    this.router.navigate(['categories']);
  }
}
