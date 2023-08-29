import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  productList!: Product[];
  totalPages!: number;
  totalElements!: number;
  size: number = 5;
  page: number = 0;

  constructor(
    private router: Router,
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProductList();
  }

  openDialog(code: string) {
    let dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        this.deleteProduct(code);
      } else {
        dialogRef.close(true);
      }
    });
  }

  onPageChange(event: any) {
    this.page = event.pageIndex; // MatPaginator is 0-indexed
    this.size = event.pageSize;
    this.getProductList();
  }

  private getProductList() {
    this.productService
      .getProductList(this.page, this.size)
      .subscribe((data) => {
        this.productList = data['content'];
        this.totalElements = data['totalElements'];
        this.totalPages = data['totalPages'];
      });
  }

  getProductDetail(code: string) {
    this.router.navigate(['products', code]);
  }

  deleteProduct(code: string) {
    this.productService.deleteProduct(code).subscribe({
      complete: () => this.getProductList(),
      error: (error) => console.log(error),
    });
  }
}
