import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent implements OnInit {
  product: Product = new Product();
  code!: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.params['code'];

    this.productService
      .getProductDetail(this.code)
      .subscribe((data) => (this.product = data['data']));
  }

  onSave() {
    this.productService.updateProduct(this.code, this.product).subscribe({
      complete: () => this.router.navigate(['/products']),
      error: (error) => console.log(error),
    });
  }
}
