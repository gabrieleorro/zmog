import { CartService } from './../../services/cart.service';
import { Component, DoCheck, OnInit } from '@angular/core';
import { faAddressCard, faShirt, faReceipt, faShop, faBasketShopping, faUser, faPlus, faUserLock, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {

  contatti = faAddressCard;
  home = faShop;
  prodotti = faShirt;
  carrello = faBasketShopping;
  logged = faUser;
  notLogged = faUserLock;
  nuovoProdotto = faPlus;
  cerca = faMagnifyingGlass;
  user: any;
  ricerca: string = '';
  numeroProdotti = 0;

  constructor(
    private router: Router,
    public authService: AuthService,
    private productService: ProductService,
    private cartService: CartService,
  ){}

  ngOnInit(): void {
    this.cartService.getCarrello().subscribe( (prodotti) => {
      this.numeroProdotti = prodotti.length;
    })
  }

  ngDoCheck(): void {
    if(JSON.parse(localStorage.getItem('user')) !== null) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  risultatoRicerca() {
    const currentRoute = this.router.url;
    if(currentRoute !== `/prodotti/cerca/${this.ricerca}`) {
      this.productService.testoCercato.next(this.ricerca);
      this.router.navigate([`/prodotti/cerca/${this.ricerca}`]);
      this.ricerca = '';
    } else {
      this.productService.testoCercato.next(this.ricerca);
      this.router.navigate([`/prodotti/cerca/${this.ricerca}`]);
      this.ricerca = '';
    }
  }
}
