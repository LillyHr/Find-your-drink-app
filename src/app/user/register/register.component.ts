import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EMAIL_DOMAIN } from 'src/app/constants';
import { emailValidator } from 'src/app/utils/email-validator';
import { matchPasswordsValidator } from 'src/app/utils/mathc-passwords-validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAIN)]],
    tel: [''],
    passGroup: this.fb.group({
      password: ['', Validators.required],
    rePassword: ['', Validators.required]
    }, {
      validators: [matchPasswordsValidator('password', 'rePassword')],
    })
    })
    
    constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private router: Router
      ) {}
    
    register(): void {
      if (this.form.invalid)  {
        return;
      }

      const { username, email, tel, 
        passGroup: { password, rePassword } = {}, 
      } = this.form.value;

    this.userService
    .register(username!, email!, tel!, password!, rePassword! )
    .subscribe(() => {
      this.router.navigate(['/home']);
    })
    }
}
