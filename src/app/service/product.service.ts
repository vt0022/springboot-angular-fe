import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productListUrl = 'http://127.0.0.1:8080/api/products';

  constructor(private httpClient: HttpClient) {}

  getProductList(page: number, size: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    return this.httpClient.get<any>(`${this.productListUrl}`, {
      params: params,
    });
  }

  getProductDetail(code: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.productListUrl}` + '/' + encodeURIComponent(code)
    );
  }

  addNewProduct(product: Product): Observable<any> {
    return this.httpClient.post<any>(`${this.productListUrl}`, product);
  }

  updateProduct(code: string, product: Product): Observable<any> {
    return this.httpClient.put<any>(
      `${this.productListUrl}` + '/' + encodeURIComponent(code),
      product
    );
  }

  deleteProduct(code: string): Observable<any> {
    return this.httpClient.delete(
      `${this.productListUrl}` + '/' + encodeURIComponent(code)
    );
  }
}
