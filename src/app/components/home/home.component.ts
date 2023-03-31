import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
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
    this.messages1 = [
      { severity: 'success', summary: 'Success', detail: 'Message Content' },
      { severity: 'info', summary: 'Info', detail: 'Message Content' },
    ];
    this.messages2 = [
      { severity: 'warn', summary: 'Warning', detail: 'Il sito è ancora in fase di progettazione...' },
      // { severity: 'error', summary: 'Error', detail: 'Closable Message Content' },
    ];
  }
}

