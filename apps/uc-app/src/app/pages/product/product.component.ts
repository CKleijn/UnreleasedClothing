import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
import { User } from '../../auth/user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'uc-app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  loggedInUser$: Observable<User | undefined> | undefined;
  products$: Observable<Product[]> | undefined; 

  constructor(private authService: AuthService, private productService: ProductService) { }

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
    this.products$ = this.productService.getProducts();
  }
}
