import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { render } from 'creditcardpayments/creditCardPayments';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {


  prodotto: Product;

  quantita: number = 1;

  value: number;
  stars: number;

  loading = true;
  tagliaSelezionata: string;

  form = new FormGroup({
    feedback: new FormControl(''),
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
  ) {

  }

  onSubmit(){
    console.log(this.form.value);
  }

  incrementa() {
    this.quantita++;
  }

  decrementa() {
    if (this.quantita > 1) {
      this.quantita--;
    }
  }

  ngOnInit(): void {
    this.onGetProduct2();
  }

  onGetProduct(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('_id');

    this.productService.getProduct(id).subscribe({
      next: (res) => {
        this.loading = false;
        this.prodotto = res;
        this.productService.prodottoCart.next(res);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onGetProduct2(): void {
    this.activatedRoute.params.subscribe((parametriUrl) => {
      const id = parametriUrl['_id'];

      this.productService.getProduct(id).subscribe({
        next: (res) => {
        this.loading = false;
        this.prodotto = res;
        this.productService.prodottoCart.next(res);
        },
        error: (error) => {
          console.log(error);
        }
      })
    })
  }

  addToCart(quantita) {
    this.cartService.aggiungiProdotto(this.prodotto, quantita, this.tagliaSelezionata);
    this.router.navigate(['cart']);
  }

  selezionaTaglia(taglia: string) {
    this.tagliaSelezionata = taglia;
  }
}
