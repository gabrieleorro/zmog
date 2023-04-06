import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { PRODUCTS } from '../mocks/products.mock';
import { Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiBaseUrl = 'api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    // return of (PRODUCTS);
    return this.http.get<Product[]>(`${this.apiBaseUrl}/`);
  }

  getProduct(id: string): Observable<Product> {
    // const product = PRODUCTS.find(prodotto => prodotto._id === id);
    // return of (product);
    return this.http.get<Product>(`${this.apiBaseUrl}/${id}`);
  }

  insertProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/`, product);
  }

}
