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
constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCocktails().subscribe((data) => {

      this.cocktails = data;
    })
  }
}
