import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'uc-app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  productId: string | null = null;
  product = new Product();
  product$: Observable<Product> | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.productId = params.get('productId');
          return this.productService.getProductById(Number(this.productId));
        })
      )
      .subscribe((product) => {
        this.product = {
          ...product
        };
      });
  }

  onSubmit(): void {
    this.productService.updateProduct(Number(this.productId), this.product);
    this.router.navigate(['products']);
  }
}
