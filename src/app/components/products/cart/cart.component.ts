import { Component, DoCheck } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
declare var paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements DoCheck {

  product: any;
  carrello = this.cartService.getCarrello();
  prezzoTotale = 0;
  numeroProdotti = 0;
  loggato: boolean;
  isCartEmpty = true;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    public authService: AuthService,
  ) {}


  ngOnInit() {
    this.productService.prodottoCart.subscribe({
      next: (res) => {
        this.product = res;

        this.isCartEmpty = false;
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.carrello.subscribe((prodotti) => {
      this.prezzoTotale = prodotti.reduce((totale, prodotto) => totale + prodotto.price * prodotto.quantita, 0);
      this.numeroProdotti = prodotti.length;
      this.isCartEmpty = this.numeroProdotti === 0;
    });
    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.prezzoTotale.toFixed(2) // imposta il valore totale del carrello come valore dell'ordine
            }
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then((details) => {
          // chiamata API per confermare l'acquisto
          alert('Pagamento completato con successo!');
          this.cartService.svuotaCarrello();
        });
      }
    }).render('#paypal-button-container');
  }

  ngDoCheck(): void {
    if(JSON.parse(localStorage.getItem('user')) !== null) {
      this.loggato = this.authService.isLogged();
    }
  }

  removeProduct(prodotto: any) {
    this.cartService.rimuoviProdotto(prodotto);
    this.aggiornaTotale();
    this.router.navigate(['cart']);
  }

  removeAll(){
    this.cartService.svuotaCarrello();
    this.prezzoTotale = 0;
    this.isCartEmpty = true;
  }

  calcolaPrezzoProdotto(prodotto: any) {
    return prodotto.price * prodotto.quantita;
  }

  aggiornaTotale() {
    let nuovoTotale = 0;
    for (let prodotto of this.product) {
      nuovoTotale += prodotto.quantita * prodotto.price;
    }
    this.prezzoTotale = nuovoTotale;
  }

}
