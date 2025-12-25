import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ApiResponse } from '../../../core/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl = '/api/products';

  constructor(private http: HttpClient) { }

getProducts(): Observable<ApiResponse<Product[]>> {
  return this.http.get<ApiResponse<Product[]>>(this.baseUrl);
}

  addProduct(product: Product): Observable<ApiResponse<null>> {
  return this.http.post<ApiResponse<null>>(this.baseUrl, product);
}


 updateProduct(product: Product): Observable<ApiResponse<null>> {
  return this.http.post<ApiResponse<null>>(`${this.baseUrl}/update`, product);
}

  deleteProduct(id: number): Observable<ApiResponse<null>> {
  return this.http.post<ApiResponse<null>>(
    `${this.baseUrl}/delete`,
    { id }
  );
}

}
