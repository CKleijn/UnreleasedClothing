import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'uc-app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();

    this.httpClient.get(environment.API_URL + 'product/6384c6cd51414ad4ca4d70eb/comment/6384cfff3d2f763d4f3c75b5').subscribe((x) => console.log(x))
  }
}
