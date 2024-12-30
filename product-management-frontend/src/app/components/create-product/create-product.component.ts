import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { SweetalertService } from '../../services/sweetalert.service';

@Component({
    selector: 'app-create-product',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      InputTextModule,
      TextareaModule,
      InputNumberModule,
      ButtonModule
    ],
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
    productForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private router: Router,
        private sweetalertService: SweetalertService,

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
            this.sweetalertService
              .showSuccess('Product created successfully!', 'Success')
              .then(() => {
                this.router.navigate(['/products']);
              });
          },
          error: () => {
            this.sweetalertService.showError(
              'Failed to create product. Please try again later.',
              'Error Creating Product'
            );
          },
        });
      } else {
        this.sweetalertService.showError(
          'Please fill out all required fields correctly.',
          'Invalid Form Submission'
        );
      }
    }

  navigateToProductPage() {
    this.router.navigate(['/products']);
  }
  hasError(field: string): boolean {
    const control = this.productForm.get(field);
    return !!control && control.invalid && control.touched;
  }

}
