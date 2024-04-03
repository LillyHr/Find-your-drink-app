import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CocktailService } from 'src/app/cocktail-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-cocktail',
  templateUrl: './create-cocktail.component.html',
  styleUrls: ['./create-cocktail.component.css']
})
export class CreateCocktailComponent {
  // @Input() cocktail: Cocktail[] = [];
form = this.fb.group({
  name: [''],
  ingredients: [''],
  instructions: [''],
  imageURL: ['']
})

  constructor(
    private cocktailService: CocktailService, 
    private router: Router,
    private fb: FormBuilder) {}
  
createDrink() {
if (this.form.invalid) {return;}
const {name, ingredients, instructions, imageURL} = this.form.value;
// console.log(form.value);
// form.value.inputName
this.cocktailService.createDrink(name!, ingredients!, instructions!, imageURL!).subscribe(() => {
    this.router.navigate(['/cocktails']);
  })
}
}
