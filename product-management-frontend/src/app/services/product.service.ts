import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdDate: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5145';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  createProduct(product: Product): Observable<Product> {
      return this.http.post<Product>(`${this.baseUrl}/products`, product);
  }

  updateProduct(product: Product): Observable<Product> {
      return this.http.put<Product>(`${this.baseUrl}/products/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/products/${id}`);
  }
}
