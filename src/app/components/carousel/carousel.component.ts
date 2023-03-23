import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  images = [
    {
      id: 1,
      label: 'Prodotto finale'
    },
    {
      id: 2,
      label: 'Fase design'
    },
  ];

  percorso = "../assets/images/carousel-";

}
