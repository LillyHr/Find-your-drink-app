import { User } from "./user";

export interface Cocktail {
    name: String,
    ingredients: String,
    instructions: String,
    userId: User | undefined,
    imageURL: String,
    likedBy: String[],
    likes: String,  
}