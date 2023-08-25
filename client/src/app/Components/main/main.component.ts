import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/Models/iproduct';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  products: Iproduct[] = [];
  constructor(
    private router: Router,
    private ProductsService: ProductService
  ) {}

  ngOnInit(): void {
    this.ProductsService.allProducts.subscribe((data) => {
      this.products = data;
    });
  }
  productCategory(id: number) {
    this.router.navigate(['/productCategory', id]);
  }
}
