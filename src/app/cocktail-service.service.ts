import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cocktail } from './types/cocktailsType';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  constructor(private http: HttpClient) {}

  getCocktails(): Observable<Cocktail[]> {
    const { apiUrl } = environment;
      return this.http.get<Cocktail[]>(`${apiUrl}`);
  }
}
