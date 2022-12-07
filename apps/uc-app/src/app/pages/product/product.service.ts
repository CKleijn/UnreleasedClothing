import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/uc-app/src/environments/environment';
import { catchError, Observable, tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { AdviceDto } from './dtos/advice.dto';
import { ProductDto } from './dtos/product.dto';
import { Product } from './product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getProducts(): Observable<Product[]> {
        return this.httpClient.get(environment.API_URL + 'products') as Observable<Product[]>;
    }

    getProductById(productId: string): Observable<Product> {
        return this.httpClient.get(environment.API_URL + 'product/' + productId) as Observable<Product>;
    }

    getProductAdvice(productId: string): Observable<AdviceDto> {
        return this.httpClient.get(environment.API_URL + 'product/' + productId + '/advice') as Observable<AdviceDto>;
    }

    createProduct(productDto: ProductDto): Observable<Object> {
        return this.httpClient.post(environment.API_URL + 'product', 
        {
            name: productDto.name,
            picture: productDto.picture,
            price: productDto.price,
            description: productDto.description,
            category: productDto.category._id,
        }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        }).pipe(
            catchError((error: any) => {
                throw new Error(error.error.message);
            })
        ) as Observable<Object>
    }

    updateProduct(productId: string, newProduct: ProductDto): Observable<Object> {
        return this.httpClient.put(environment.API_URL + 'product/' + productId, 
        {
            name: newProduct?.name,
            picture: newProduct?.picture,
            price: newProduct?.price,
            description: newProduct?.description,
            category: newProduct?.category?._id,
        }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        }).pipe(
            catchError((error: any) => {
                throw new Error(error.error.message);
            })
        ) as Observable<Object>
    }

    deleteProduct(productId: string): Observable<Object> {
        return this.httpClient.delete(environment.API_URL + 'product/' + productId, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        }).pipe(
            catchError((error: any) => {
                throw new Error(error.error.message);
            })
        ) as Observable<Object>
    }
}
