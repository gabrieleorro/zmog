import { Component, DoCheck } from '@angular/core';
import { faAddressCard, faShirt, faReceipt, faShop, faBasketShopping, faUser, faPlus, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck {

  contatti = faAddressCard;
  home = faShop;
  prodotti = faShirt;
  carrello = faBasketShopping;
  logged = faUser;
  notLogged = faUserLock;
  nuovoProdotto = faPlus;
  user: any;

  constructor(
    private router: Router,
    public authService: AuthService,
  ){}

  ngDoCheck(): void {
    if(JSON.parse(localStorage.getItem('user')) !== null) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
