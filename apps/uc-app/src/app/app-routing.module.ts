import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductDetailComponent } from './pages/product/detail/detail.component';
import { CategoryDetailComponent } from './pages/category/detail/detail.component';
import { ProductFormComponent } from './pages/product/form/form.component';
import { CategoryFormComponent } from './pages/category/form/form.component';
import { ProductComponent } from './pages/product/product.component';
import { RatingComponent } from './pages/rating/rating.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HasRoleGuard, IsAuthenticatedGuard } from './auth/auth.guard';
import { CommentFormComponent } from './pages/comment/form/form.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'products' },
    { path: 'login', pathMatch: 'full', component: LoginComponent },
    { path: 'register', pathMatch: 'full', component: RegisterComponent },
    { path: 'products', pathMatch: 'full', component: ProductComponent },
    { path: 'products/create', pathMatch: 'full', component: ProductFormComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: 'brand' } },
    { path: 'products/:productId', pathMatch: 'full', component: ProductDetailComponent, canActivate: [IsAuthenticatedGuard] },
    { path: 'products/:productId/edit', pathMatch: 'full', component: ProductFormComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: 'brand' } },
    { path: 'products/:productId/comment/create', pathMatch: 'full', component: CommentFormComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: 'customer' } },
    { path: 'products/:productId/comment/:commentId/edit', pathMatch: 'full', component: CommentFormComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: 'customer' } },
    { path: 'categories', pathMatch: 'full', component: CategoryComponent, canActivate: [IsAuthenticatedGuard] },
    { path: 'categories/create', pathMatch: 'full', component: CategoryFormComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: 'brand' } },
    { path: 'categories/:categoryId', pathMatch: 'full', component: CategoryDetailComponent, canActivate: [IsAuthenticatedGuard] },
    { path: 'categories/:categoryId/edit', pathMatch: 'full', component: CategoryFormComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: 'brand' } },
    { path: 'ratings', pathMatch: 'full', component: RatingComponent, canActivate: [IsAuthenticatedGuard] },
    { path: 'about', pathMatch: 'full', component: AboutComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'products' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
