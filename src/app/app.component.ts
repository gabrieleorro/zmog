import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { faAddressCard, faShirt } from '@fortawesome/free-solid-svg-icons';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faHotel } from '@fortawesome/free-solid-svg-icons';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zmog';

  faAddressCard = faAddressCard;
  faReceipt = faReceipt;
  faHotel = faHotel;
  faShirt = faShirt;
  faCartArrowDown = faCartArrowDown;

  images = [
    {
      id: 1,
      label: 'Prodotto finale'
    },
    {
      id: 2,
      label: 'Fase di design'
    },
  ];

  percorso = "../assets/images/carousel-";
}
