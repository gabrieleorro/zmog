import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  prodotti: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.prodotti = response;
        this.prodotti = this.prodotti.sort((a, b) => b.sells - a.sells).slice(0, 4);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}

