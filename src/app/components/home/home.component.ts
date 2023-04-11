import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  prodotti: Product[];
  utenteRegistrato: any;
  name: string;
  email: string;

  constructor(
    private productService: ProductService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.prendiProdotti();
    this.prendiDatiUtente();
  }

  prendiProdotti(){
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

  prendiDatiUtente() {
    this.userService.datiUtente.subscribe({
      next: (response) => {
        this.utenteRegistrato = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  closeModal(){
    this.utenteRegistrato = null;
  }
}
