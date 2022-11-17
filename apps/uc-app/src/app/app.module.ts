import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { ProductComponent } from './pages/product/product.component';
import { DetailComponent } from './pages/product/detail/detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from './pages/product/form/form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    DetailComponent,
    FormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
