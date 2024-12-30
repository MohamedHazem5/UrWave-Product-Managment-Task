import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { SweetalertService } from '../../services/sweetalert.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    ButtonModule,InputTextModule,InputNumberModule,TextareaModule], // Ensure proper order and no dynamic code
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductForm!: FormGroup;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private sweetalertService: SweetalertService,

  ) {}

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.editProductForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });

    this.loadProduct();
  }

  loadProduct(): void {
    this.productService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.editProductForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
        });
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.sweetalertService.showError(
          'Failed to load product details. Please try again later.',
          'Error Loading Product'
        );
      },
    });
  }


  onSubmit(): void {
    if (this.editProductForm.valid) {
      this.productService.updateProduct(this.productId, this.editProductForm.value).subscribe({
        next: () => {
          this.sweetalertService
            .showSuccess('Product updated successfully', 'Success')
            .then(() => {
              this.router.navigate(['/products']); // Navigate after showing the success message
            });
        },
        error: () => {
          this.sweetalertService.showError(
            'An error occurred while updating the product. Please try again later.',
            'Error Updating Product'
          );
        },
      });
    } else {
      this.sweetalertService.showError(
        'Please fill in all required fields correctly.',
        'Invalid Form Submission'
      );
    }
  }
  navigateToProductPage() {
    this.router.navigate(['/products']);
  }
  hasError(field: string): boolean {
    const control = this.editProductForm.get(field);
    return !!control && control.invalid && control.touched;
  }
}
