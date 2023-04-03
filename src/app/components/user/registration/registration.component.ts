import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidator } from '../customValidator';
import { PrimeNGConfig } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  countries: any[];

  constructor(private config: PrimeNGConfig, private userService: UserService, private router: Router) {}

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

  onSubmit() {
    // console.log(this.form.value);
    const user = {
      name: this.form.value.name,
      email: this.form.value.email
    }

    this.userService.datiUtente.next(user);
    this.router.navigate(['home']);
  }

}
