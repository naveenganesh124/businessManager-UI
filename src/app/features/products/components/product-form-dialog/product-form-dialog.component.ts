import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { Product } from '../../models/product.model';

@Component({
  standalone: true,
  selector: 'app-product-form-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './product-form-dialog.component.html'
})
export class ProductFormDialogComponent {

  productForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Product
  ) {
    this.isEditMode = !!data;

    this.productForm = this.fb.group({
      id: [data?.id],
      productName: [data?.productName || '', Validators.required],
      category: [data?.category || '', Validators.required],
      brand: [data?.brand || '', Validators.required],
      price: [data?.price || 0, Validators.required],
      stock: [data?.stock || 0, Validators.required],
    });
  }

  save(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
