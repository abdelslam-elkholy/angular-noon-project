import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MainComponent } from './Components/main/main.component';
import { ProductsComponent } from './Components/products/products.component';
import { CategoryComponent } from './Components/category/category.component';
import { SingleProductComponent } from './Components/single-product/single-product.component';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CategoriesListComponent } from './Components/categories-list/categories-list.component';
import { SigninModalComponent } from './Components/signin-modal/signin-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignupModalComponent } from './Components/signup-modal/signup-modal.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ProductsComponent,
    CategoryComponent,
    SingleProductComponent,
    CarouselComponent,
    CategoriesListComponent,
    SigninModalComponent,
    SignupModalComponent,
    AdminDashboardComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BsDropdownModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
