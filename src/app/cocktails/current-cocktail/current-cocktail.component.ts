import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailService } from 'src/app/cocktail-service.service';
import { Cocktail } from 'src/app/types/cocktailsType';

@Component({
  selector: 'app-current-cocktail',
  templateUrl: './current-cocktail.component.html',
  styleUrls: ['./current-cocktail.component.css']
})
export class CurrentCocktailComponent implements OnInit {
cocktail = {} as Cocktail;
isEditing: boolean = false;
  constructor(
    private cocktailService: CocktailService, 
    private activeRoute: ActivatedRoute,
    private router: Router
    ) {}

    ngOnInit(): void {
      this.activeRoute.params.subscribe((data) => {
        const valueId = 'cocktailId';
        const id = data[valueId];        
        this.cocktailService.getCocktail(id).subscribe(cocktail => {
         this.cocktail = cocktail;
        });
      });
    };

editCocktail(form: NgForm) {
  if (form.invalid) {return}
  form.value.id = this.cocktail._id;
  this.cocktailService.editCocktail(
    form.value.id,
    form.value.name,
    form.value.ingredients,
    form.value.instructions,
    form.value.imageURL).subscribe(cocktail => {
      this.cocktail = cocktail;
      this.isEditing = false;
    }) 

}

deleteCocktail(id: String) {
  const valueId = id.toString();
  console.log(valueId);
  
  this.cocktailService.deleteCocktail(valueId).subscribe(() => {
    this.router.navigate(['/cocktails']);
  })
}

}
