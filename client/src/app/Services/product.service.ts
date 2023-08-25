import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../Models/iproduct';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  get allProducts(): Observable<Iproduct[]> {
    return this.httpClient.get<Iproduct[]>(
      `${environment.BaseApiURL}/products`
    );
  }
  getProductByID(id: number): Observable<Iproduct> {
    return this.httpClient.get<Iproduct>(
      `${environment.BaseApiURL}/products/${id}`
    );
  }

  searchByName(name: string): Observable<Iproduct[]> {
    return this.httpClient.get<Iproduct[]>(
      `${environment.BaseApiURL}/products/search?name=${name}`
    );
  }

  getByCategory(id: number): Observable<Iproduct[]> {
    return this.httpClient.get<Iproduct[]>(
      `${environment.BaseApiURL}/products/?categoryID=${id}`
    );
  }

  addProduct(product: Iproduct): Observable<Iproduct> {
    return this.httpClient.post<Iproduct>(
      `${environment.BaseApiURL}/products`,
      product
    );
  }
  updateProduct(product: Iproduct): Observable<Iproduct> {
    return this.httpClient.put<Iproduct>(
      `${environment.BaseApiURL}/products/${product.id}`,
      product
    );
  }
  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.BaseApiURL}/products/${id}`
    );
  }
}
