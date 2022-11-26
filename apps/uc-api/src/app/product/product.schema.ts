import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

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
    isActive: Boolean;

    @Prop()
    createdAt: Date;

    @Prop()
    createdBy: ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);