import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailService } from 'src/app/cocktail-service.service';
import { Cocktail } from 'src/app/types/cocktailsType';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-current-cocktail',
  templateUrl: './current-cocktail.component.html',
  styleUrls: ['./current-cocktail.component.css']
})
export class CurrentCocktailComponent implements OnInit {
cocktail = {} as Cocktail;
isEditing: boolean = false;
isLiked: boolean = false;
  constructor(
    private cocktailService: CocktailService, 
    private activeRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
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
    onToggle: boolean = true;

onEdit() {
  // this.editCocktail()
}
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
    }) 

}

toggleLikedByUser(id: string): void {
  this.cocktail._id = id;
  this.cocktail.likedByUser = !this.cocktail.likedByUser;
  this.cocktailService.updateCocktail(this.cocktail._id).subscribe(cocktail => {
    this.cocktail = cocktail;
    this.isLiked = !this.isLiked;
    this.router.navigate(['/view/dashboard']);

  });
}



deleteCocktail(id: String) {  
  const valueId: string = (this.cocktail._id).toString();
  
  this.cocktailService.deleteCocktail(valueId).subscribe(() => {
    this.router.navigate(['/view/cocktails']);
  })
}
}



