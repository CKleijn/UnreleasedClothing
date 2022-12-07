import { User } from "../user/user.model";

export class Comment {
    _id: string = '';
    title: string = '';
    body: string = '';
    rating: number = 0;
    createdBy: User = <User>{};
    createdAt: Date = <Date>{};
}