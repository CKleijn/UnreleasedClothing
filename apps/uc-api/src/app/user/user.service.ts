import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RegisterUserDto } from "./dtos/registerUser.dto";
import { User } from "./user.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getUserByEmailAddress(emailAddress: string): Promise<User> {
        return await this.userModel.findOne({ emailAddress });
    }

    async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
        const user = {
            ...registerUserDto,
            'createdAt': new Date()
        }
        return await this.userModel.create(user);
    }
}