import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user/user.schema';

@Schema()
export class Comment {
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
    rating: Number;

    @Prop()
    createdBy: User;

    @Prop()
    createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);