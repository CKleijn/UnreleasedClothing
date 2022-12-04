import { Rating } from "../rating/rating.model";

export class CommentDto {
    title: string = '';
    body: string = '';
    rating: Rating = <Rating>{};
}