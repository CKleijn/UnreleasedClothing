import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { DetailComponent } from './pages/product/detail/detail.component';
import { FormComponent } from './pages/product/form/form.component';
import { ProductComponent } from './pages/product/product.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'products' },
    { path: 'products', pathMatch: 'full', component: ProductComponent },
    { path: 'products/create', pathMatch: 'full', component: FormComponent },
    { path: 'products/:productId', pathMatch: 'full', component: DetailComponent },
    { path: 'products/:productId/edit', pathMatch: 'full', component: FormComponent },
    { path: 'about', pathMatch: 'full', component: AboutComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'products' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
