import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Icon {
    _id: mongoose.Types.ObjectId

    @Prop({
        required: [true, 'Title is required!']
    })
    title: String;

    @Prop({
        required: [true, 'Icon is required!'],
        default: 'https://www.simplelaw.com/hubfs/Blog_Media/cdn2.hubspot.nethubfs5154887Blog_Mediaimage_not_found.png'
    })
    icon: String;
}

export const IconSchema = SchemaFactory.createForClass(Icon);