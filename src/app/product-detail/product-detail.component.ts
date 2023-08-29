import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  code!: string;
  product?: Product;

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // This is for PathVariable
    this.code = this.router.snapshot.params['code'];
    // this.code = this.router.snapshot.paramMap.get('code')
    // For QueryParams, use queryParams or queryParamMap

    this.productService
      .getProductDetail(this.code)
      .subscribe((data) => (this.product = data['data']));
  }
}
