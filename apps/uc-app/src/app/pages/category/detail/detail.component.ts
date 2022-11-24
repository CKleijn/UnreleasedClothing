import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../product/product.model';
import { ProductService } from '../../product/product.service';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'uc-app-detail-category',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class CategoryDetailComponent implements OnInit {
  categoryId: string | null = null;
  category: Category | undefined;
  createdAt: string | null = null;
  totalUsed: number = 0;
  usedBy: Product[] = [];
  cantDelete: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId');
      this.category = this.categoryService.getCategoryById(Number(this.categoryId));
      this.createdAt = this.category.createdAt.toLocaleDateString();
      this.totalUsed = this.categoryService.getTotalUsedByCategoryId(Number(this.categoryId));
      this.usedBy = this.productService.getProductsByCategoryId(Number(this.categoryId));       
    })
  }

  delete(): void {
    if(this.totalUsed === 0) {
      this.categoryService.deleteCategory(Number(this.categoryId));
      this.router.navigate(['categories']);
    } else {
      this.cantDelete = true;
    }
  }
}
