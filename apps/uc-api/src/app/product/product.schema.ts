import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from '../category/category.schema';
import { User } from '../user/user.schema';

@Schema()
export class Product {
    @Prop({
        required: [true, 'Name is required!'],
    })
    name: String;

    @Prop({
        required: [true, 'Picture is required!'],
    })
    picture: String;

    @Prop({
        required: [true, 'Price is required!'],
    })
    price: Number;

    @Prop({
        required: [true, 'Description is required!'],
    })
    description: String;

    @Prop()
    category: Category;

    @Prop()
    comments: [Comment];

    @Prop()
    isActive: Boolean;

    @Prop()
    createdBy: User;

    @Prop()
    createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);