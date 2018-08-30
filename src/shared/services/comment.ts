import { User } from "src/shared/services/user";

export class Comment {
    comment: string;
    film_id: number;
    film_language: string;
    title: string;
    user : User
}