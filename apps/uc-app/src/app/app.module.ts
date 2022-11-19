import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductComponent } from './pages/product/product.component';
import { DetailComponent } from './pages/product/detail/detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from './pages/product/form/form.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    DetailComponent,
    FormComponent,
    NavComponent,
    FooterComponent,
    AboutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
