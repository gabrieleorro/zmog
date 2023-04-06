import { first, take } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input() pag: string;

  products: Product[];
  page = 1;
  prodottiPerPagina = 4;
  prodottiTotali: number;

  prodottiFiltrati: Product[];
  filtro: string = '';

  constructor(
    private productService: ProductService,
  ) {}

  ngOnDestroy(): void {
    console.log('Utente uscito dal componente')
  }

  ngOnInit(): void {
    this.getProdotti('all');
  }

  getProdotti(tipo: string): void {
    this.productService.getProducts().pipe(first()).subscribe({
      next: (response) => {
          this.prodottiTotali = response.length;
          if(tipo != 'all') {
            // Filtra i prodotti in base al tipo di abbigliamento specificato
            this.products = response.filter(prodotto => prodotto.type === tipo);
            this.prodottiTotali = response.filter(prodotto => prodotto.type === tipo).length;
          } else {
            this.products = response;
            if(this.pag != 'prodotti') {
              this.products = response.sort((a, b) => b.sells - a.sells).slice(0, 4);
            }
          }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  paginate(event) {
    event.page = event.page + 1;
    this.page = event.page;
  }


}
