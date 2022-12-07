import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/uc-app/src/environments/environment';
import { AuthService } from '../../auth/auth.service';
import { Category } from './category.model';
import { catchError, map, Observable, tap } from 'rxjs';
import { CategoryDto } from './category.dto';
import { Product } from '../product/product.model';
import { Icon } from '../../shared/icon/icon.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getCategories(): Observable<Category[]> {
        return this.httpClient.get(environment.API_URL + 'categories') as Observable<Category[]>;
    }

    getAllCategories(): Observable<Category[]> {
        return this.httpClient.get(environment.API_URL + 'categories/all') as Observable<Category[]>;
    }

    getIcons(): Observable<Icon[]> {
        return this.httpClient.get(environment.API_URL + 'icons') as Observable<Icon[]>;
    }

    getProductsByCategory(categoryId: string): Observable<Product[]> {
        return this.httpClient.get(environment.API_URL + 'products/category/' + categoryId) as Observable<Product[]>;
    }

    getCategoryById(categoryId: string): Observable<Category> {
        return this.httpClient.get(environment.API_URL + 'category/' + categoryId) as Observable<Category>;
    }

    createCategory(categoryDto: CategoryDto): Observable<Object> {
        return this.httpClient.post(environment.API_URL + 'category', 
        {
            title: categoryDto.title,
            description: categoryDto.description,
            icon: categoryDto.icon._id,
            isActive: categoryDto.isActive
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

    updateCategory(categoryId: string, categoryDto: CategoryDto): Observable<Object> {
        return this.httpClient.put(environment.API_URL + 'category/' + categoryId, 
        {
            title: categoryDto?.title,
            description: categoryDto?.description,
            icon: categoryDto?.icon._id,
            isActive: categoryDto?.isActive
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

    deleteCategory(categoryId: string): Observable<Object> {
        return this.httpClient.delete(environment.API_URL + 'category/' + categoryId, {
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
