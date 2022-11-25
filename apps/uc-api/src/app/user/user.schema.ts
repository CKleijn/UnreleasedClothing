import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../auth/roles/role.enum';

@Schema()
export class User {
    @Prop({
        required: [true, 'Name is required!'],
    })
    name: string;

    @Prop({
        required: [true, 'Emailaddress is required!'],
        validate: {
            validator: function (v: any) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Use a correct emailaddress like j.doe@gmail.com!',
        },
    })
    emailAddress: string;

    @Prop({
        required: [true, 'Picture is required!'],
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    })
    picture: string;

    @Prop({
        required: [true, 'Role is required!'],
        enum: {
            values: [Role.BRAND, Role.CUSTOMER],
            message: 'Choose between a customer or a brand as role!'
        }
    })
    role: string;

    @Prop({
        required: [true, 'Password is required!'],
    })
    password: string;

    @Prop({
        default: true
    })
    isActive: boolean;

    @Prop()
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);