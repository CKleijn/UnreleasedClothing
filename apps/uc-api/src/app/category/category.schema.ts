import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class Category {
    @Prop()
    userId: ObjectId;

    @Prop({
        required: [true, 'Title is required!'],
    })
    title: string;

    @Prop({
        required: [true, 'Description is required!'],
    })
    description: string;

    @Prop({
        required: [true, 'Icon is required!'],
    })
    icon: string

    @Prop()
    createdAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);