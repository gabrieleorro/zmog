import { Component } from '@angular/core';
import { faAddressCard, faShirt, faReceipt, faShop, faBasketShopping, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  faAddressCard = faAddressCard;
  faReceipt = faReceipt;
  faShop = faShop;
  faShirt = faShirt;
  faBasketShopping = faBasketShopping;
  faUser = faUser;
  faPlus = faPlus;

}
