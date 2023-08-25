import { MainComponent } from './Components/main/main.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleProductComponent } from './Components/single-product/single-product.component';
import { CategoryComponent } from './Components/category/category.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './Guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainComponent, title: 'Home Page' },
  { path: 'products', component: MainComponent, title: 'Home Page' },

  {
    path: 'singleProduct/:id',
    component: SingleProductComponent,
    title: 'Products Details',
  },
  {
    path: 'productCategory/:id',
    component: CategoryComponent,
    title: 'Category',
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    canActivate: [adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
