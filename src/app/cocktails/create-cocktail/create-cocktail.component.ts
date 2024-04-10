import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CocktailService } from 'src/app/cocktail-service.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-create-cocktail',
  templateUrl: './create-cocktail.component.html',
  styleUrls: ['./create-cocktail.component.css']
})
export class CreateCocktailComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }
  // @Input() cocktail: Cocktail[] = [];
form = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(2)]],
  ingredients: ['', [Validators.required, Validators.minLength(2)]],
  instructions: ['', [Validators.required]],
  imageURL: ['']
})

  constructor(
    private userService: UserService,
    private cocktailService: CocktailService, 
    private router: Router,
    private fb: FormBuilder) {}
  
createDrink() {
if (this.form.invalid) {return;}
const {name, ingredients, instructions, imageURL} = this.form.value;
// console.log(form.value);
// form.value.inputName
this.cocktailService.createDrink(name!, ingredients!, instructions!, imageURL!).subscribe(() => {
    this.router.navigate(['/view/cocktails']);
  })
}
}
