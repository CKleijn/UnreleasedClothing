import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAuthorized = this.authService.currentUser$.getValue()?.role === route.data['role'];

        if(!isAuthorized && !IsAuthenticatedGuard) {
            this.router.navigate(['login']);
        } else if(!isAuthorized && IsAuthenticatedGuard) {
            this.router.navigate(['/']);
        }

        return isAuthorized;
    }
}

@Injectable({
    providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAuthenticated = this.authService.currentUser$.getValue() !== undefined;

        if(!isAuthenticated)
            this.router.navigate(['login']);

        return isAuthenticated;
    }
}