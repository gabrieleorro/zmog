import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent {

  prodottoInserito: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private modal: NgbModal,
  ) {}

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    sells: new FormControl('0', Validators.required),
    type: new FormControl('', Validators.required),
    published: new FormControl(false),
  });

  addProduct(): void {
    const product = this.form.value;
    this.productService.insertProduct(product).pipe(take(1)).subscribe({
      next: (res) => {
        console.log('Prodotto inserito correttamente.', res);
        this.prodottoInserito = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onNewProduct() {
    this.prodottoInserito = '';
    this.form.patchValue({
      title: '',
      description: '',
      image: '',
      price: '',
      sells: '',
      type: '',
      published: false,
    })
  }

  onClose() {
    this.prodottoInserito = '';
    this.router.navigate(['prodotti']);
  }

  open(content: any, titolo?: string) {
    this.modal.open(content, { ariaLabelledBy: 'modale servizio', size: 'lg', centered: true}).result.then((res) => {
      this.onNewProduct();
    }).catch((err) => {
      this.onClose();
    });
  }

}
