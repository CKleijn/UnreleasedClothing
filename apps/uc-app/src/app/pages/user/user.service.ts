import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/uc-app/src/environments/environment';
import { catchError, Observable, tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Category } from '../category/category.model';
import { Comment } from '../comment/comment.model';
import { Product } from '../product/product.model';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getProfileFromOtherUser(userId: string): Observable<User> {
        return this.httpClient.get(environment.API_URL + 'user/' + userId) as Observable<User>
    }

    getAllCommentsFromUser(userId: string): Observable<Comment[]> {
        return this.httpClient.get(environment.API_URL + 'comments/' + userId, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        }) as Observable<Comment[]>
    }

    getAllCategoriesFromUser(userId: string): Observable<Category[]> {
        return this.httpClient.get(environment.API_URL + 'categories/' + userId, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        }) as Observable<Category[]>
    }

    getProductsFromBrand(brandId: string): Observable<Product[]> {
        return this.httpClient.get(environment.API_URL + 'products/' + brandId, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        }) as Observable<Product[]>
    }

    getFollowers(userId: string): Observable<User[]> {
        return this.httpClient.get(environment.API_URL + 'user/' + userId + '/followers', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        }) as Observable<User[]>
    }
    
    followUser(userId: string): Observable<Object> {
        return this.httpClient.post(environment.API_URL + 'user/' + userId + '/follow', {
            emailAddress: this.authService.currentUser$.getValue()?.emailAddress
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

    unfollowUser(userId: string): Observable<Object> {
        return this.httpClient.post(environment.API_URL + 'user/' + userId + '/unfollow', {
            emailAddress: this.authService.currentUser$.getValue()?.emailAddress
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

    checkFollowStatus(userId: string): Observable<boolean> {
        return this.httpClient.get(environment.API_URL + 'user/' + userId + '/status', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        }) as Observable<boolean>
    }
}
