import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Icon } from '../icon/icon.schema';

@Schema()
export class Category {
    @Prop()
    _id: ObjectId;

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
    icon: Icon;

    @Prop({
        required: [true, 'isActive is required!'],
    })
    isActive: Boolean;

    @Prop()
    createdAt: Date;

    @Prop({
        ref: 'User'
    })
    createdBy: ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);