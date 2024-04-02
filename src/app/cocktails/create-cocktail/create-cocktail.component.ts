import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { CocktailService } from 'src/app/cocktail-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-cocktail',
  templateUrl: './create-cocktail.component.html',
  styleUrls: ['./create-cocktail.component.css']
})
export class CreateCocktailComponent {
  
  constructor(private cocktailService: CocktailService, private router: Router) {}
  
createDrink(form: NgForm) {
  console.log(form.value)
if (form.invalid) {return;}
console.log('component');
this.cocktailService.createDrink(
  form.value.name,
  form.value.ingredients,
  form.value.instructions,
  form.value.imageURL
  )
this.router.navigate(['/cocktails']);
}
}
