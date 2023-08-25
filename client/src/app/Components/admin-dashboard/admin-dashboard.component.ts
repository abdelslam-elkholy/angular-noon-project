import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/Models/iproduct';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  products: Iproduct[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // Fetch products of a specific category, e.g., category with ID 1
    this.productService.allProducts.subscribe((data) => {
      this.products = data;
    });
  }

  addProduct(): void {
    this.router.navigate(['/product-details', 'new']);
  }

  editProduct(product: Iproduct): void {
    this.router.navigate(['/product-details', product.id]);
  }

  deleteProduct(product: Iproduct): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product.id).subscribe(() => {
        this.products = this.products.filter((p) => p.id !== product.id);
      });
    }
  }
}
