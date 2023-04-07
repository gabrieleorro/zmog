import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  prodotto: Product;

  quantita: number = 1;

  value: number;
  stars: number;

  loading = true;

  form = new FormGroup({
    feedback: new FormControl(''),
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  onSubmit(){
    console.log(this.form.value);
  }

  incrementa() {
    this.quantita++;
  }

  decrementa() {
    if (this.quantita > 1) {
      this.quantita--;
    }
  }

  ngOnInit(): void {
    this.onGetProduct2();
  }

  onGetProduct(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('_id');

    this.productService.getProduct(id).subscribe({
      next: (res) => {
        this.loading = false;
        this.prodotto = res;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onGetProduct2(): void {
    this.activatedRoute.params.subscribe((parametriUrl) => {
      const id = parametriUrl['_id'];

      this.productService.getProduct(id).subscribe({
        next: (res) => {
        this.loading = false;
        this.prodotto = res;
        },
        error: (error) => {
          console.log(error);
        }
      })
    })
  }
}
