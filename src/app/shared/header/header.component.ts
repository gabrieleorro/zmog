import { Component } from '@angular/core';
import { faAddressCard, faShirt } from '@fortawesome/free-solid-svg-icons';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faShop } from '@fortawesome/free-solid-svg-icons';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons'

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

}
