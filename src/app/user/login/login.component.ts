import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMAIL_DOMAIN } from 'src/app/constants';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
domains = EMAIL_DOMAIN;
isLoggedIn: boolean = false;
constructor(
  private userService: UserService,
  private router: Router
) {}

login(form: NgForm) {
  if (form.invalid) {
    return;
  }

  const { email, password } = form.value;
  this.userService.login(email, password).subscribe(() => {
    this.router.navigate(['/home']);
  })

}
}

export let isLoggedIn: boolean = true;
