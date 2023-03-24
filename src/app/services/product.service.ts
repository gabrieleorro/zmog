import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { PRODUCTS } from '../mocks/products.mock';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProduct(): Observable<Product[]> {
    return of (PRODUCTS);
  }
}
