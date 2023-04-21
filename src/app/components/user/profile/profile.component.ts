import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  user: any;
  data: any;
  update: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private modal: NgbModal,
  ){}

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('user')) !== null) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.onGetUser();
    }
  }

  onGetUser(): void {
    this.userService.getUser(this.user.username).pipe(take(1)).subscribe({
      next: (res) => {
        this.user = res;
        this.data = moment(this.user.createdAt).locale('it').format('LLLL');
        this.update = moment(this.user.updatedAt).locale('it').format('LLLL');
      },
      error: (err) => console.log(err)
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  open(content: any, user?: any) {
    this.modal.open(content, { ariaLabelledBy: 'modale modifica', size: 'lg', centered: true}).result.then((res) => {
      this.onGetUser();
    }).catch((err) => {
      this.onClose();
    });
  }

  onClose() {
    this.router.navigate(['/account/profilo']);
  }

}
