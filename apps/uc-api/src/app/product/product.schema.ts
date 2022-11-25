import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class Product {
    @Prop({
        required: [true, 'Name is required!'],
    })
    name: string;

    @Prop({
        required: [true, 'Picture is required!'],
    })
    picture: string;

    @Prop({
        required: [true, 'Price is required!'],
    })
    price: number;

    @Prop({
        required: [true, 'Description is required!'],
    })
    description: string;

    @Prop()
    isActive: boolean;

    @Prop()
    createdAt: Date;

    @Prop()
    createdBy: ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);