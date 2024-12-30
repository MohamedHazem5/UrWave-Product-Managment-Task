import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-product',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputTextModule, InputNumberModule, ButtonModule],
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
    productForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private router: Router
    ) {
        this.productForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(100)]],
            description: ['', [Validators.required, Validators.maxLength(500)]],
            price: [0, [Validators.required, Validators.min(0.01)]],
        });
    }

    onSubmit(): void {
      if (this.productForm.valid) {
          this.productService.createProduct(this.productForm.value).subscribe({
              next: () => {
                  alert('Product created successfully!');
                  this.router.navigate(['/products']);
              },
              error: () => alert('Failed to create product.'),
          });
      }
  }

}
