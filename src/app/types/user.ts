import { Cocktail } from "./cocktailsType";

export interface User {
    name: string,
    email: string,
    password: string,
    createdCocktails: Cocktail[],
    likedCocktails: string[],
    tel: string,
    
}

export interface UserAuth {
    id : string[],
    username: string,
    email: string,
    tel: string,
    password: string,
    rePassword: string,
    createdCocktails: string[],
    likedCocktails: string[],
}

export interface ProfileDetails {
    username: string;
    email: string;
    tel: string;
    // createdCocktails: string[],
    // likedCocktails: string[],
  }