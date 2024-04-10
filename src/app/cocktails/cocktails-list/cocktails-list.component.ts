import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CocktailService } from 'src/app/cocktail-service.service';
import { Cocktail } from 'src/app/types/cocktailsType';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-cocktails-list',
  templateUrl: './cocktails-list.component.html',
  styleUrls: ['./cocktails-list.component.css']
})
export class CocktailsListComponent implements OnInit {
  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }
  // get userId(): string {
  //   return this.userService.user?.id || '';
  // }
  isLiked: boolean = false;


  cocktails: Cocktail[] | null = [];
constructor(
  private cocktailService: CocktailService,
  private userService: UserService
  ) {}
isEmpty: boolean = false;


  ngOnInit(): void {
    this.cocktailService.getCocktails().subscribe((data) => {
this.cocktails = data;
return this.cocktails;
    });
    if (this.cocktails?.length === 0) {
      this.isEmpty = true;
    }
// isLiked(cocktail: Cocktail) {
//   const isLikedBy = cocktail.likedBy.find((data) => {
//     return data === this.userService.user?.id;
//   }
// }
// const likedCocktails = user
  }

}
