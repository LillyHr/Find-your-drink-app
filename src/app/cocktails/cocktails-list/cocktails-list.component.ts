import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CocktailService } from 'src/app/cocktail-service.service';
import { Cocktail } from 'src/app/types/cocktailsType';

@Component({
  selector: 'app-cocktails-list',
  templateUrl: './cocktails-list.component.html',
  styleUrls: ['./cocktails-list.component.css']
})
export class CocktailsListComponent implements OnInit {
  cocktails: Cocktail[] | null = [];
constructor(private cocktailService: CocktailService,
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
  }
}
