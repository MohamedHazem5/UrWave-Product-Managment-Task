import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProductService, Product } from '../../services/product.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SweetalertService } from '../../services/sweetalert.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, FontAwesomeModule, FormsModule],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faSearch = faSearch;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  loading = true;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  sortField: string = 'id';
  sortOrder: number = 1;

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
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
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

filterProducts(): void {
    const term = this.searchTerm.toLowerCase();
    const min = this.minPrice ?? 0; // Default to 0 if null
    const max = this.maxPrice ?? Number.MAX_VALUE; // Default to max value if null

    this.filteredProducts = this.products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(term);
      const matchesPrice =
        product.price >= min && product.price <= max;

      return matchesSearch && matchesPrice;
    });
  }

  onSort(event: any): void {
    this.sortField = event.field;
    this.sortOrder = event.order;
    this.sortProducts();
  }

  sortProducts(): void {
    const field = this.sortField;
    const order = this.sortOrder;
    this.filteredProducts.sort((a, b) => {
      let valueA = a[field as keyof Product];
      let valueB = b[field as keyof Product];
      // If the values are strings, convert them to lowercase
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      if (valueA < valueB) {
        return order === 1 ? -1 : 1;
      } else if (valueA > valueB) {
        return order === 1 ? 1 : -1;
      }
      return 0;
    });
  }



  deleteProduct(id: number): void {
    this.sweetalertService
      .confirmAction('Are you sure you want to delete this product?', 'Delete Product')
      .then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProduct(id).subscribe({
            next: () => {
              this.sweetalertService.showSuccess('Product deleted successfully.');
              this.loadProducts();
            },
            error: () =>
              this.sweetalertService.showError('Failed to delete the product.'),
          });
        }
      });
  }
}
