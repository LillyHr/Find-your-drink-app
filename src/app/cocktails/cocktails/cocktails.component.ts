import { Component, OnInit } from '@angular/core';
import { CocktailService } from '../../cocktail-service.service';
import { Cocktail } from '../../types/cocktailsType';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css']
})
export class CocktailsComponent implements OnInit {
  cocktails: Cocktail[] = [];

  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {
      this.getCocktails();
  }

  getCocktails(): void {
      this.cocktailService.getCocktails()
          .subscribe(cocktails => this.cocktails = cocktails);
  }
}
