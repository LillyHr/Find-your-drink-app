import { Component, OnInit } from '@angular/core';
import { CocktailService } from 'src/app/cocktail-service.service';
// import { Cocktail } from 'src/app/types/cocktailsType';
import { UserService } from '../user.service';
import { ProfileDetails } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

profileDetails: ProfileDetails = {
  username: '',
  tel: '',
  email: '',

};


constructor(
  private cocktailService: CocktailService,
  private userService: UserService
) {}


  ngOnInit(): void {

  const { username, tel, email } = this.userService.user!;

  this.profileDetails = {
    username,
    tel,
    email,
  };
}
  
}
