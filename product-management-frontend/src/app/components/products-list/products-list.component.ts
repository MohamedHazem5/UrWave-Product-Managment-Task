import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProductService, Product } from '../../services/product.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SweetalertService } from '../../services/sweetalert.service';

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

    constructor(
      private productService: ProductService,
      private router: Router,
      private sweetalertService: SweetalertService,

    ) {}

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
      this.loading = true; // Show a loading spinner or indicator
      this.productService.getProducts().subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.sweetalertService.showError(
            'Failed to load products. Please try again later.',
            'Error Loading Products'
          );
        },
      });
    }

    deleteProduct(id: number): void {
      // Use SweetAlert2 for confirmation
      this.sweetalertService
        .confirmAction('Are you sure you want to delete this product?', 'Delete Product')
        .then((result) => {
          if (result.isConfirmed) {
            // Proceed with deletion if confirmed
            this.productService.deleteProduct(id).subscribe({
              next: () => {
                this.sweetalertService.showSuccess('Product deleted successfully.');
                this.loadProducts(); // Reload the product list
              },
              error: () =>
                this.sweetalertService.showError('Failed to delete the product.'),
            });
          }
        });
    }
}
