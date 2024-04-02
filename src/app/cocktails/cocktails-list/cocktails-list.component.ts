import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Cocktail } from 'src/app/types/cocktailsType';

@Component({
  selector: 'app-cocktails-list',
  templateUrl: './cocktails-list.component.html',
  styleUrls: ['./cocktails-list.component.css']
})
export class CocktailsListComponent implements OnInit {
  cocktails: Cocktail[] | null = [];
  isEmpty: boolean = false;

constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCocktails().subscribe((data) => {
console.log('data');

      this.cocktails = data;
    });
    if (this.cocktails?.length === 0) {
      this.isEmpty = true;
    }
  }
}
