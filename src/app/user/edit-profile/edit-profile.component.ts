import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/utils/email-validator';
import { EMAIL_DOMAIN } from 'src/app/constants';
import { ProfileDetails } from 'src/app/types/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileDetails: ProfileDetails = {
    username: '',
    tel: '',
    email: '',
    // createdCocktails: [],
    // likedCocktails: [],
  };

form = this.fb.group({
  username: ['', [Validators.required]],
  email: ['', [Validators.required, emailValidator(EMAIL_DOMAIN)]],
  tel: [''],
  // password: ['', Validators.required],
});


  constructor(
    private userService: UserService,

    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    const { username, tel, email } = this.userService.user!;

    this.profileDetails = {
      username,
      tel,
      email,
    };

    this.form.setValue({ username, tel, email });
  }
SaveProfile() {
  if (this.form.invalid) {
    return;
  }

  this.profileDetails = this.form.value as ProfileDetails;
  const { username, email, tel } = this.profileDetails;

  this.userService.updateProfile(username, email, tel).subscribe(() => {
  });
}



}
