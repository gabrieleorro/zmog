import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  prodotti: Product[];

  messages1: Message[];
  messages2: Message[];

  name: string;
  email: string;

  constructor(private productService: ProductService, private userService: UserService) {}

  ngOnInit(): void {
    this.prendiProdotti();
    this.prendiDatiUtente();
    this.messages1 = [
      { severity: 'success', summary: 'Success', detail: 'Message Content' },
      { severity: 'info', summary: 'Info', detail: 'Message Content' },
    ];
    this.messages2 = [
      { severity: 'warn', summary: 'Warning', detail: 'Il sito è ancora in fase di progettazione...' },
      // { severity: 'error', summary: 'Error', detail: 'Closable Message Content' },
    ];
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
    this.userService.datiUtente.subscribe((res: any) => {
      // localStorage.setItem('name', res.name);
      // localStorage.setItem('email', res.email);
      this.name = res.name;
      this.email = res.email;
    })
    // if(localStorage.getItem('name')){
    //   this.name = localStorage.getItem('name');
    //   this.email = localStorage.getItem('email');
    // }
  }

  closeModal(){
    // localStorage.removeItem('name');
    // localStorage.removeItem('email');
    this.name = '';
    this.email = '';
  }
}
