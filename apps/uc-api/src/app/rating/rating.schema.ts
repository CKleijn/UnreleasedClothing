import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class Rating {
    @Prop()
    _id: ObjectId;

    @Prop({
        required: [true, 'Title is required!'],
    })
    title: String;

    @Prop({
        required: [true, 'Picture is required!'],
    })
    picture: String;

    @Prop({
        required: [true, 'Mark is required!'],
    })
    grade: Number;

    @Prop({
        required: [true, 'Description is required!'],
    })
    description: String;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);