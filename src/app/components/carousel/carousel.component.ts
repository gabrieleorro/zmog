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
      label: 'DESIGN STAGE'
    },
    {
      id: 2,
      label: 'DESIGN STAGE'
    },
    {
      id: 3,
      label: 'DESIGN STAGE'
    },
  ];

  percorso = "../assets/images/carousel-";

}
