import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, of, Subscription, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginUserDto } from './login/login.dto';
import { RegisterUserDto } from './register/register.dto';
import { User } from '../pages/user/user.model';

const TOKEN_KEY = 'JWT';
const USER_KEY = 'USER'

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {
    localStorageSubcription: Subscription | undefined;
    userSubscription : Subscription | undefined;
    currentUser$ = new BehaviorSubject<User | undefined>(undefined);
    userDtoFromRegister: LoginUserDto | undefined;

    constructor(private httpClient: HttpClient) {
        this.localStorageSubcription = this.getUserFromLocalStorage()
        .pipe(
            tap((user: User | undefined) => {
                this.currentUser$.next(user);
            })
        ).subscribe()
    }

    signUserIn(user: LoginUserDto): Observable<boolean> {
        return this.httpClient.post(environment.API_URL + 'user/login', 
        {
            username: user.username,
            password: user.password
        }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(
            map((response: any) => {
                localStorage.removeItem(TOKEN_KEY);
                localStorage.setItem(TOKEN_KEY, response.jwt_token);
                this.userSubscription = this.getUser().subscribe((user: User) => {
                    localStorage.removeItem(USER_KEY);
                    localStorage.setItem(USER_KEY, JSON.stringify(user));
                    this.currentUser$.next(user);
                });

                return true;
            }),
            catchError((error: any) => {
                throw new Error(error.error.message);
            })
        ) as Observable<boolean>
    }

    registerUser(user: RegisterUserDto): Observable<boolean> {
        return this.httpClient.post(environment.API_URL + 'user/register', {
            name: user.name,
            emailAddress: user.emailAddress,
            picture: user.picture,
            role: user.role,
            password: user.password
        }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(
            map(() => {
                return true;
            }),
            catchError((error: any) => {
                throw new Error(error.error.message);
            })
        ) as Observable<boolean>
    }

    getUser(): Observable<User> {
        return this.httpClient.get(environment.API_URL + 'user/profile', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.getToken()
            })
        }) as Observable<User>;
    }

    getUserFromLocalStorage(): Observable<User | undefined> {
        const user = localStorage.getItem(USER_KEY);

        if (user) {
            const localUser = JSON.parse(user);
            return of(localUser);
        } else {
            return of(undefined);
        }
    }

    getToken(): string {
        return localStorage.getItem(TOKEN_KEY)!;
    }

    signOut(): void {
        localStorage.clear();
        this.currentUser$.next(undefined);
    }

    ngOnDestroy(): void {
        this.localStorageSubcription?.unsubscribe;
        this.userSubscription?.unsubscribe;
    }
}
