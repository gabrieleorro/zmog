import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  prodotti: Product[];

  prodottiFiltrati: Product[];

  filtro: string = '';

  constructor
  (
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {};

  ngOnInit(): void {
    this.getProdotti('all');
  }

  getProdotti(tipo: string): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
          this.prodotti = response;
          this.prodottiFiltrati = this.prodotti.slice();
          if(tipo != 'all') {
            // Filtra i prodotti in base al tipo di abbigliamento specificato
            this.prodottiFiltrati = this.prodotti.filter(prodotto => prodotto.type === tipo);
          }
      },
      error: (error) => {
        console.log(error);
      }
    })

  }
}
