import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Cocktail } from './types/cocktailsType';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getCocktails(): Observable<Cocktail[]> {
    const { apiUrl } = environment;

    return this.http.get<Cocktail[]>(`${apiUrl}/cocktails`);
  }

}
