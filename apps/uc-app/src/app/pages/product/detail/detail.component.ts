import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'uc-app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  productId: string | null = null;
  product$: Observable<Product> | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('productId');
      this.product$ = this.productService.getProductById(Number(this.productId));
    })
  }

  delete(): void {
    this.productService.deleteProduct(Number(this.productId));
    this.router.navigate(['products']);
  }
}
