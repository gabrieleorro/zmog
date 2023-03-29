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
      label: '"CUPID"'
    },
    {
      id: 2,
      label: '"AIR J1"'
    },
    {
      id: 3,
      label: '"DRUNK APOLLO"'
    },
    {
      id: 4,
      label: '"ROSE"'
    },
    {
      id: 5,
      label: '"FLY"'
    },
    {
      id: 6,
      label: '"TIGER"'
    },
  ];

  percorso = "../assets/images/carousel-";

}
