import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  prodotti: Product[];

  constructor(private productService: ProductService) {};

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.prodotti = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
