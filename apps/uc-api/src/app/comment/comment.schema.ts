import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Rating } from '../rating/rating.schema';
import { User } from '../user/user.schema';

@Schema()
export class Comment {
    @Prop()
    _id: ObjectId;

    @Prop({
        required: [true, 'Title is required!'],
    })
    title: String;

    @Prop({
        required: [true, 'Body is required!'],
    })
    body: String;

    @Prop({
        required: [true, 'Rating is required!'],
    })
    rating: Rating;

    @Prop({
        ref: 'User'
    })
    createdBy: User;

    @Prop()
    createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);