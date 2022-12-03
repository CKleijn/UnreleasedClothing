import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { RegisterUserDto } from "./dtos/registerUser.dto";
import { User } from "./user.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async getUserById(userId: string): Promise<User> {
        const user = await this.userModel.findOne({ _id: userId }).populate('following');
        
        if (!user)
            throw new HttpException({ message: `This user doesn't exists!` }, HttpStatus.NOT_FOUND);

        return user;
    }

    async getUserByEmailAddress(emailAddress: string): Promise<User> {
        return await this.userModel.findOne({ emailAddress }).populate('following');
    }

    async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
        return await this.userModel.create({
            _id: new mongoose.Types.ObjectId(),
            ...registerUserDto,
            createdAt: new Date()
        });
    }

    async followUser(emailAddress: string, userId: string): Promise<User> {
        const currentUser = await this.getUserByEmailAddress(emailAddress);
        const followUser = await this.getUserById(userId);
        const followedUser = await this.userModel.aggregate([
            {
                '$unwind': {
                    'path': '$following'
                }
            }, {
                '$match': {
                    'following': userId
                }
            }
        ])

        if (followUser.role === 'customer') {
            if (followedUser.length === 0) {
                return await this.userModel.findOneAndUpdate({ emailAddress }, { $push: { following: userId } });
            } else {
                throw new HttpException({ message: `You already follow this customer!` }, HttpStatus.BAD_REQUEST);
            }
        } else {
            throw new HttpException({ message: `You can only follow other customers!` }, HttpStatus.BAD_REQUEST);
        }
    }

    async unfollowUser(emailAddress: string, userId: string): Promise<User> {
        const currentUser = await this.getUserByEmailAddress(emailAddress);
        const followUser = await this.getUserById(userId);
        const followedUser = await this.userModel.aggregate([
            {
                '$unwind': {
                    'path': '$following'
                }
            }, {
                '$match': {
                    'following': userId
                }
            }
        ])

        if (followedUser.length > 0)
            return await this.userModel.findOneAndUpdate({ emailAddress }, { $pull: { following: userId } });

        throw new HttpException({ message: `You don't follow this customer!` }, HttpStatus.CONFLICT);
    }
}