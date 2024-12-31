import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoadingService } from './loading.service'; // Import the LoadingService

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdDate: string;
  imageUrl: string; // Bonus
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:5145';

  constructor(private http: HttpClient, private loadingService: LoadingService) {}

  getProducts(): Observable<Product[]> {
    this.loadingService.show();
    return this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  createProduct(product: Product): Observable<Product> {
    this.loadingService.show();
    return this.http.post<Product>(`${this.baseUrl}/products`, product).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  getProduct(id: number): Observable<any> {
    this.loadingService.show();
    return this.http.get(`${this.baseUrl}/products/${id}`).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  updateProduct(id: number, product: any): Observable<any> {
    this.loadingService.show();
    return this.http.put(`${this.baseUrl}/products/${id}`, product).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  deleteProduct(id: number): Observable<void> {
    this.loadingService.show();
    return this.http.delete<void>(`${this.baseUrl}/products/${id}`).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
}
