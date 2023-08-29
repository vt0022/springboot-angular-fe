import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  product: Product = new Product();

  constructor(private productService: ProductService, private router: Router, private snackBar: MatSnackBar) {}

  onSave() {
    this.addNewProduct();
  }

  ngOnInit(): void {}

  addNewProduct() {
    this.productService.addNewProduct(this.product).subscribe({
      complete: () => this.router.navigate(['/products']),
      error: (error) => this.openSnackBar(error.error.message, 'OK'),
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
    });
  }
}
