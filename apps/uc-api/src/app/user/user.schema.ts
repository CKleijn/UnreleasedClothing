import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Role } from '../auth/roles/role.enum';

@Schema()
export class User {
    @Prop()
    _id: ObjectId;

    @Prop({
        required: [true, 'Name is required!'],
    })
    name: String;

    @Prop({
        required: [true, 'Emailaddress is required!'],
        validate: {
            validator: function (v: any) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Use a correct emailaddress like j.doe@gmail.com!',
        },
    })
    emailAddress: String;

    @Prop({
        required: [true, 'Picture is required!'],
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    })
    picture: String;

    @Prop({
        ref: 'User'
    })
    following: [ObjectId];

    @Prop({
        required: [true, 'Role is required!'],
        enum: {
            values: [Role.BRAND, Role.CUSTOMER],
            message: 'Choose between a customer or a brand as role!'
        }
    })
    role: String;

    @Prop({
        required: [true, 'Password is required!'],
    })
    password: String;

    @Prop({
        default: true
    })
    isActive: Boolean;

    @Prop()
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);