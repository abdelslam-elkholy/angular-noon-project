import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/Models/iproduct';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  currentProduct: Iproduct = {
    id: 0,
    name: '',
    quantity: 0,
    price: 0,
    categoryID: 0,
    Material: '',
    PrdImgURL: '',
    details: '',
  };
  isNewProduct: boolean = true;
  successMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId === 'new') {
      this.isNewProduct = true;
    } else {
      this.isNewProduct = false;
      this.productService
        .getProductByID(Number(productId))
        .subscribe((product) => {
          this.currentProduct = product;
        });
    }
  }

  saveProduct(): void {
    if (this.isNewProduct) {
      this.productService.addProduct(this.currentProduct).subscribe(() => {
        this.successMessage = 'Product added successfully!';
        setTimeout(() => {
          this.router.navigate(['/admin-dashboard']);
        }, 1500);
      });
    } else {
      this.productService.updateProduct(this.currentProduct).subscribe(() => {
        this.successMessage = 'Changes saved successfully!';
        setTimeout(() => {
          this.router.navigate(['/admin-dashboard']);
        }, 1500);
      });
    }
  }
}
