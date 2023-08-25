import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/Services/product.service';
import { Iproduct } from 'src/app/Models/iproduct';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  products!: Iproduct[];
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

      this.ProductsService.getByCategory(this.id).subscribe((data) => {
        this.products = data;
        !this.products && this.location.back();
      });
    });
  }

  productCategory(id: number) {
    this.router.navigate(['/productCategory', id]);
  }
}
