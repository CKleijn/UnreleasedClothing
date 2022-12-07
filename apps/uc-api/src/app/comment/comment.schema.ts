import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
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
    rating: Number;

    @Prop({
        ref: 'User'
    })
    createdBy: User;

    @Prop()
    createdAt: Date;
}