import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {

  loggingError: string;
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  onSubmit(credentials: any) {
    if (credentials.username != '' && credentials.password != '') {
      this.authService.login(credentials.username, credentials.password).subscribe({
        next: (res) => {
          this.user = res;
          if(res) {
            this.authService.saveStorage(res);
            this.router.navigate(['home']);
          } else {
            this.loggingError = 'Username o password errati.';
          }
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: 'Errore', detail: 'Username o password errati.', life: 5000});
        }
      })
    }
  }

}
