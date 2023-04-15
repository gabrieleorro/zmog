import { delay, first, take } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  providers: [MessageService]
})
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input() pag: string;

  products: Product[];
  page = 1;
  prodottiPerPagina = 4;
  prodottiTotali: number;

  prodottiFiltrati: Product[];
  filtro: string = '';
  loading = true;
  ruolo: any;
  ricercato: string;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private userService: UserService,
  ) {}

  ngOnDestroy(): void {
    console.log('Utente uscito dal componente')
  }

  ngOnInit(): void {
    this.getProdotti('all');
    if(JSON.parse(localStorage.getItem('user')) != null) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.onGetUser(user.username);
    }
  }

  onGetUser(username): void {
    this.userService.getUser(username).pipe(take(1)).subscribe({
      next: res => {
        this.ruolo = res.role;
      },
      error: (err) => console.log(err)
    })
  }

  getProdotti(tipo: string): void {
    this.productService.getProducts().pipe(first()).subscribe({
      next: (response) => {
        if(this.pag === 'ricerca') {
          this.loading = false;
          this.ricercaProdotti();
        } else {
          this.prodottiTotali = response.length;
          if(response) {
            this.messageService.add({severity: 'success', summary: 'Completato!', detail: 'Prodotto caricato correttamente!'});
          }
          if(tipo != 'all') {
            // Filtra i prodotti in base al tipo di abbigliamento specificato
            this.loading = false;
            this.products = response.filter(prodotto => prodotto.type === tipo);
            this.prodottiTotali = response.filter(prodotto => prodotto.type === tipo).length;
          } else {
            this.loading = false;
            this.products = response;
            if(this.pag != 'prodotti') {
              this.products = response.sort((a, b) => b.sells - a.sells).slice(0, 4);
            }
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

  ricercaProdotti() {
    this.productService.testoCercato.subscribe({
      next: (res: string) => {
        this.ricercato = res;
        if (this.ricercato) {
          this.productService.findProducts(this.ricercato).subscribe({
            next: (res) => {
              this.products = res;
              if(res.length < 4) {
                this.prodottiPerPagina = res.length;
              }
              this.prodottiTotali = res.length;
              if(res) {
                this.messageService.add({severity: 'success', summary:'Completato', detail: 'Prodotti cercati correttamente.', life: 5000})
              }
            },
            error: (err) => {
              console.log(err);
            }
          })
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
