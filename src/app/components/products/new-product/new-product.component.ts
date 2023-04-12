import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { MessageService } from 'primeng/api';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  providers: [MessageService]
})
export class NewProductComponent {

  prodottoInserito: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private modal: NgbModal,
    private messageService: MessageService,
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

  Editor = ClassicEditorBuild;

  editorConfig = {
    toolbar: {
      items: [
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'heading',
        '|',
        'codeBlock',
        'blockQuote',
        'insertTable',
        'undo',
        'redo',
      ]
    },
    image: {
      toolbar: [
        'imageStyle:full',
        'imageStyle:side',
        '|',
        'imageTextAlternative'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
    },
    height: 300,
  };

  addProduct(): void {
    const product = this.form.value;
    this.productService.insertProduct(product).pipe(take(1)).subscribe({
      next: (res) => {
        console.log('Prodotto inserito correttamente.', res);
        this.prodottoInserito = res;
        if(res) {
          this.messageService.add({severity: 'success', summary: 'Successo', detail: 'Prodotto inserito correttamente.', life: 3000});
        }
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
