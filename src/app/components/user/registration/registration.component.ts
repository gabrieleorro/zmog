import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidator } from '../customValidator';
import { PrimeNGConfig } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  countries: any[];
  utenteInserito: any;

  constructor(
    private config: PrimeNGConfig,
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.config.setTranslation({
      weak: 'Debole',
      medium: 'Media',
      strong: 'Forte',
      passwordPrompt: 'Livello di sicurezza',
    });
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    birthDate: new FormControl(''),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)]),
    cellPhone: new FormControl('', [Validators.required, Validators.pattern(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/)]),
    ripetiPassword: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    note: new FormControl(''),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', Validators.required),
    additionalInformation: new FormControl(''),
    cap: new FormControl('', [Validators.required, Validators.min(5)]),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.requiredTrue),
  },
  [CustomValidator.MatchValidator('password', 'ripetiPassword')]
  );

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

  onSubmit() {
    const user = this.form.value;

    this.userService.insertUser(user).pipe(take(1)).subscribe({
      next: (res) => {
        console.log('Utente inserito correttamente', res);
        this.utenteInserito = res;
        this.userService.datiUtente.next(user);
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  open(content: any, titolo?: string) {
    let title = titolo;
    this.modalService.open(content, { ariaLabelledBy: 'modale servizi', size: 'md', centered: true}).result.then((res) => {
      console.log('Azione da eseguire')
    }).catch((res) => {
      console.log('Nessuna azione da eseguire')
    });
  }

}
