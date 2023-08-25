import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/Models/iproduct';
import { IUser } from 'src/app/Models/iuser';
import { ProductService } from 'src/app/Services/product.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  products: Iproduct[] = [];
  searchValue: string = '';
  loggedIn: boolean = false;
  loggedInUser: IUser | null = null;

  constructor(
    private productsService: ProductService,
    private userService: UserService,
    private router: Router,
    private authService: UserAuthService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
      if (this.loggedIn) {
        this.loggedInUser = JSON.parse(
          localStorage.getItem('loggedInUser') || '{}'
        );
      }
    });

    this.loggedIn = this.userService.isLoggedIn();
    if (this.loggedIn) {
      this.loggedInUser = JSON.parse(
        localStorage.getItem('loggedInUser') || '{}'
      );
    }
  }

  filter(searchInput: any) {
    this.searchValue = searchInput.target.value;

    this.productsService.searchByName(this.searchValue).subscribe((data) => {
      this.products = data;
    });
  }

  ProductDetails(id: number) {
    this.router.navigate(['/singleProduct', id]);
  }

  logout() {
    this.userService.logout();
    this.loggedIn = false;
    this.loggedInUser = null;
    this.router.navigate(['/']);
  }
}
