import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../customValidator';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {

  @Output() chiudi = new EventEmitter();
  @Input() utente: any;

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.onGetUser();
  }

  onGetUser(): void {
    const username = this.utente.username;

    this.userService.getUser(username).subscribe({
      next: (res) => {
        this.form.patchValue({
          name: res.name,
          surname: res.surname,
          birthDate: res.birthDate,
          username: res.username,
          password: res.password,
          cellPhone: res.cellPhone,
          ripetiPassword: res.ripetiPassword,
          email: res.email,
          note: res.note,
          gender: res.gender,
          address: res.address,
          additionalInformation: res.additionalInformation,
          cap: res.cap,
          city: res.city,
          country: res.country,
          terms: res.terms
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onSubmit() {
    console.log(this.form.value);
  }

  modificaUtente(user: any) {
    this.userService.updateUser(this.utente.username, user).subscribe({
      next: (res) => {
        console.log(res);
        this.chiudi.emit(res);
      },
      error: (err) => console.log(err)
    })
  }

}
