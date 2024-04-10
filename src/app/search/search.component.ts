import { Component, EventEmitter, Output } from '@angular/core';
import { CocktailService } from '../cocktail-service.service';
import { Cocktail } from '../types/cocktailsType';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = '';
  @Output() searchByName: EventEmitter<string> = new EventEmitter<string>();
cocktailArray: string[] = [];
cocktail: Cocktail[] = [];
  constructor(
    private cocktailService: CocktailService
  ) {}
  finding() {
    this.cocktailService.getCocktails().subscribe((data) => {
        this.cocktail = data;
        this.cocktailArray = this.cocktail.map(cocktail => cocktail.name);
        this.searchByName.emit(this.searchQuery);
    })
  }
  onSearch(): void {
    this.cocktailService.getCocktails().subscribe((data) => {
      this.cocktail = data;
      this.cocktailArray = this.cocktail.map(cocktail => cocktail.name);})
      this.cocktailArray = this.cocktailArray.filter(a => a.toLocaleLowerCase === this.searchQuery.toLocaleLowerCase)
      console.log(this.cocktailArray);
      
    this.searchByName.emit(this.searchQuery);
    console.log(this.searchQuery);
    console.log(this.cocktailArray);
    // this.cocktailService.onSearchByName(this.searchQuery)
  }


  
}
// onSearchByName(query: string): void {
//   // Handle the search by name logic here
//   console.log('Search by name query:', query);
// }

