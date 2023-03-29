import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { PRODUCTS } from '../mocks/products.mock';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of (PRODUCTS);
  }

  getProduct(id: number): Observable<Product> {
    const product = PRODUCTS.find(prodotto => prodotto._id === id);
    return of (product);
  }


}
