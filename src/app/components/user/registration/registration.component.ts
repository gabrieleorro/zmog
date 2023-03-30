import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    birthDate: new FormControl(''),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    cellPhone: new FormControl('', [Validators.required]),
    ripetiPassword: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', Validators.required),
    additionalInformation: new FormControl(''),
    cap: new FormControl('', [Validators.required, Validators.minLength(5)]),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.requiredTrue),
  });

  onSubmit() {
    console.log(this.form.value);
  }

}
