import { User } from "../../auth/user.model";
import { Rating } from "../rating/rating.model";

export interface IComment {
    _id: string;
    title: string;
    body: string;
    rating: Rating;
    createdBy: User;
    createdAt: Date;
}

export class Comment implements IComment {
    _id: string = '';
    title: string = '';
    body: string = '';
    rating: Rating = <Rating>{};
    createdBy: User = <User>{};
    createdAt: Date = <Date>{};
}