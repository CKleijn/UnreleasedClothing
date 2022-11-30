import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductDetailComponent } from './pages/product/detail/detail.component';
import { CategoryDetailComponent } from './pages/category/detail/detail.component';
import { ProductFormComponent } from './pages/product/form/form.component';
import { CategoryFormComponent } from './pages/category/form/form.component';
import { ProductComponent } from './pages/product/product.component';
import { RatingComponent } from './rating/rating.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'products' },
    { path: 'products', pathMatch: 'full', component: ProductComponent },
    { path: 'products/create', pathMatch: 'full', component: ProductFormComponent },
    { path: 'products/:productId', pathMatch: 'full', component: ProductDetailComponent },
    { path: 'products/:productId/edit', pathMatch: 'full', component: ProductFormComponent },
    { path: 'categories', pathMatch: 'full', component: CategoryComponent },
    { path: 'categories/create', pathMatch: 'full', component: CategoryFormComponent },
    { path: 'categories/:categoryId', pathMatch: 'full', component: CategoryDetailComponent },
    { path: 'categories/:categoryId/edit', pathMatch: 'full', component: CategoryFormComponent },
    { path: 'ratings', pathMatch: 'full', component: RatingComponent },
    { path: 'about', pathMatch: 'full', component: AboutComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'products' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
