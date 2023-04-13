import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { render } from 'creditcardpayments/creditCardPayments';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
declare var paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  product: any;
  carrello = this.cartService.getCarrello();
  prezzoTotale = 0;
  numeroProdotti = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
  ) {
    // render(
    //   {
    //     id: '#paypal-button-container',
    //     currency: 'EUR',
    //     value: '23.60',
    //     onApprove: (details) => {
    //       alert('Transaction successfull.');
    //     }
    //   }
    // )
  }

  ngOnInit() {
    this.productService.prodottoCart.subscribe({
      next: (res) => {
        this.product = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.carrello.subscribe((prodotti) => {
      this.prezzoTotale = prodotti.reduce((totale, prodotto) => totale + prodotto.price, 0);
      this.numeroProdotti = prodotti.length;
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
        });
      }
    }).render('#paypal-button-container');
  }

  removeProduct(prodotto: any) {
    this.cartService.rimuoviProdotto(prodotto);
    this.router.navigate(['cart']);
  }

  removeAll(){
    this.cartService.svuotaCarrello();
  }

}
