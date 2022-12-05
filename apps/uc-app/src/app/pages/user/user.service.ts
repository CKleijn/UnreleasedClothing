import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/uc-app/src/environments/environment';
import { catchError, Observable, tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getProfileFromCurrentUser(): Observable<User> {
        return this.httpClient.get(environment.API_URL + 'user/profile',
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.authService.getToken()
                })
            }) as Observable<User>
    }

    getProfileFromOtherUser(userId: string): Observable<User> {
        return this.httpClient.get(environment.API_URL + 'user/' + userId) as Observable<User>
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
