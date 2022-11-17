import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DetailComponent } from './pages/product/detail/detail.component';
import { FormComponent } from './pages/product/form/form.component';
import { ProductComponent } from './pages/product/product.component';

export const appRoutes: Route[] = [
    {path: 'products', pathMatch: 'full', component: ProductComponent},
    {path: 'products/create', pathMatch: 'full', component: FormComponent},
    {path: 'products/:productId', pathMatch: 'full', component: DetailComponent},
    {path: 'products/:productId/edit', pathMatch: 'full', component: FormComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
