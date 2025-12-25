import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductFormDialogComponent } from '../../components/product-form-dialog/product-form-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule

  ],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {

  displayedColumns: string[] = [
    'productName',
    'category',
    'brand',
    'price',
    'stock',
    'isActive',
    'actions'
  ];

  dataSource: Product[] = [];

  constructor(private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
  this.productService.getProducts().subscribe({
    next: (response) => {
      if (response.success) {
        this.dataSource = response.data;   
      } else {
        console.error('API returned failure', response.errors);
      }
    },
    error: (err) => {
      console.error('Failed to load products', err);
    }
  });
}


  addProduct(): void {
  const dialogRef = this.dialog.open(ProductFormDialogComponent, {
    width: '500px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.productService.addProduct(result).subscribe({
        next: (res) => {
          if (res.success) {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000
            });
            this.loadProducts();
          } else {
            this.snackBar.open(res.message || 'Failed to add product', 'Close', {
              duration: 3000
            });
          }
        },
        error: () => {
          this.snackBar.open('Failed to add product', 'Close', {
            duration: 3000
          });
        }
      });
    }
  });
}




  editProduct(row: Product): void {
  const dialogRef = this.dialog.open(ProductFormDialogComponent, {
    width: '500px',
    data: row
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.productService.updateProduct(result).subscribe({
        next: (res) => {
          if (res.success) {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000
            });
            this.loadProducts();
          } else {
            this.snackBar.open(res.message || 'Failed to update product', 'Close', {
              duration: 3000
            });
          }
        },
        error: () => {
          this.snackBar.open('Failed to update product', 'Close', {
            duration: 3000
          });
        }
      });
    }
  });
}





 deleteProduct(row: Product): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '350px',
    data: `Are you sure you want to delete "${row.productName}"?`
  });

  dialogRef.afterClosed().subscribe(confirmed => {
    if (confirmed) {
      this.productService.deleteProduct(row.id!).subscribe({
        next: (res) => {
          if (res.success) {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000
            });
            this.loadProducts();
          } else {
            this.snackBar.open(res.message || 'Failed to delete product', 'Close', {
              duration: 3000
            });
          }
        },
        error: () => {
          this.snackBar.open('Failed to delete product', 'Close', {
            duration: 3000
          });
        }
      });
    }
  });
}


}
