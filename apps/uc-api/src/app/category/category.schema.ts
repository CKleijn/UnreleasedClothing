import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class Category {
    @Prop({
        required: [true, 'Title is required!'],
    })
    title: String;

    @Prop({
        required: [true, 'Description is required!'],
    })
    description: String;

    @Prop({
        required: [true, 'Icon is required!'],
        default: 'https://www.simplelaw.com/hubfs/Blog_Media/cdn2.hubspot.nethubfs5154887Blog_Mediaimage_not_found.png'
    })
    icon: String;

    @Prop()
    createdAt: Date;

    @Prop({
        ref: 'User'
    })
    createdBy: ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);