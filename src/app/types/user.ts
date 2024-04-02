import { Cocktail } from "./cocktailsType";

export interface User {
    id: String,
    name: String,
    email: String,
    password: String,
    cocktails: Cocktail[],
    likes: String[],
    tel: String,
}