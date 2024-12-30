import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProductService, Product } from '../../services/product.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule,FontAwesomeModule],
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
    faPlus = faPlus;
    faEdit = faEdit;
    faTrash = faTrash;
    products: Product[] = [];
    loading = true;

    constructor(private productService: ProductService,private router: Router) {}

    ngOnInit(): void {
        this.loadProducts();
    }

    navigateToCreateProduct(): void {
      this.router.navigate(['/products/create']);
    }
    navigateToEditProduct(productId: number): void {
      this.router.navigate(['/products/edit', productId]);
    }

    loadProducts(): void {
        this.productService.getProducts().subscribe({
            next: (data) => {
                this.products = data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                alert('Failed to load products.');
            },
        });
    }

    deleteProduct(id: number): void {
        if (confirm('Are you sure you want to delete this product?')) {
            this.productService.deleteProduct(id).subscribe({
                next: () => this.loadProducts(),
                error: () => alert('Failed to delete product.'),
            });
        }
    }
}
