import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl = '/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  addProduct(product: Product): Observable<string> {
    return this.http.post<string>(this.baseUrl, product);
  }

  updateProduct(product: Product): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/update`, product);
  }

  deleteProduct(id: number) {
  return this.http.post('/api/products/delete', {
      id 
      
  },{ responseType: 'text' });
}

}
