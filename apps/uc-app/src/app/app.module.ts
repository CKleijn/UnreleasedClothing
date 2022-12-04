import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailComponent } from './pages/product/detail/detail.component';
import { ProductFormComponent } from './pages/product/form/form.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryDetailComponent } from './pages/category/detail/detail.component';
import { CategoryFormComponent } from './pages/category/form/form.component';
import { RatingComponent } from './pages/rating/rating.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CommentComponent } from './pages/comment/comment.component';
import { CommentProductComponent } from './pages/comment/product/product.component';
import { CommentFormComponent } from './pages/comment/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductFormComponent,
    NavComponent,
    FooterComponent,
    AboutComponent,
    CategoryComponent,
    CategoryDetailComponent,
    CategoryFormComponent,
    RatingComponent,
    LoginComponent,
    RegisterComponent,
    CommentComponent,
    CommentProductComponent,
    CommentFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
