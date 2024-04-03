import { User } from "./user";

export interface Cocktail {
    "_id": String,
    "name": String,
    "ingredients": String,
    "instructions": String,
    "imageURL": String,
    "userId": User | undefined,
    "likedBy": String[],
    "likes": String,  
}