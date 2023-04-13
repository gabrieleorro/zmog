import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private prodotti: any[] = [];
  private carrelloSubject = new BehaviorSubject<any[]>([]);

  constructor() { }

  getCarrello() {
    return this.carrelloSubject.asObservable();
  }

  aggiungiProdotto(prodotto: any) {
    this.prodotti.push(prodotto);
    this.carrelloSubject.next(this.prodotti);
  }

  rimuoviProdotto(prodotto: any) {
    const index = this.prodotti.findIndex(p => p.id === prodotto.id);
    if (index >= 0) {
      this.prodotti.splice(index, 1);
      this.carrelloSubject.next(this.prodotti);
    }
  }

  svuotaCarrello() {
    this.prodotti = [];
    this.carrelloSubject.next(this.prodotti);
  }
}
