import { User } from "./user";

export interface Cocktail {
    "_id": string,
    "name": string,
    "ingredients": string,
    "instructions": string,
    "userId": User | undefined,
    "imageURL": string,
    "likedByUser": boolean,
    "likes": string[],
}