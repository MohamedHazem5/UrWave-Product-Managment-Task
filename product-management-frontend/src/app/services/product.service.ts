import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdDate: string;
  imageUrl: string; // Bonus
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

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/products/${id}`);
  }
}
