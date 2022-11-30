import { Rating } from "../rating/rating.schema";

export class CommentDto {
    title: string;
    body: string;
    rating: Rating;
    ratingId: string;
}
