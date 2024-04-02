import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cocktail } from './types/cocktailsType';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CocktailService{
  constructor(private http: HttpClient) {}

  getCocktails(): Observable<Cocktail[]> {
    const { apiUrl } = environment;
    console.log('getting Cocktails');
    
      return this.http.get<Cocktail[]>(`${apiUrl}/cocktails`);
  }

  
  createDrink(
    name: string, 
    ingredients: string,
    instructions: string,
    imageURL: string
    ) {
      const { apiUrl } = environment;
      const payload = { name, ingredients, instructions, imageURL};
console.log('payload');

      return this.http.post<Cocktail>(`${apiUrl}/cocktails`, payload);
    }
}
