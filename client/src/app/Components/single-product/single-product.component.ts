import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/Services/product.service';
import { Iproduct } from 'src/app/Models/iproduct';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent implements OnInit {
  product: Iproduct | undefined;
  id: number = 0;
  currentIndex: number = 0;

  constructor(
    private ProductsService: ProductService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((param) => {
      this.id = Number(param.get('id')) || 0;

      this.ProductsService.getProductByID(this.id).subscribe({
        next: (data) => (this.product = data),
        error: (e) => this.location.back(),
        complete: () => console.info('complete'),
      });
    });
  }
}
