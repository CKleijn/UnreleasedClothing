import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Neo4jService } from "../neo4j/neo4j.service";
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

    async registerUser(registerUserDto: RegisterUserDto): Promise<void> {
        const user = await this.userModel.create({
            _id: new mongoose.Types.ObjectId(),
            ...registerUserDto,
            createdAt: new Date()
        });
    }

    async getFollowers(userId: string): Promise<User[]> {
        const checkUser = await this.getUserById(userId);

        return this.userModel.aggregate([
            {
                '$unwind': {
                    'path': '$following',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$match': {
                    'following': new mongoose.Types.ObjectId(userId)
                }
            }, {
                '$group': {
                    '_id': '$role',
                    'following': {
                        '$push': {
                            '_id': '$_id',
                            'name': '$name',
                            'picture': '$picture'
                        }
                    }
                }
            }, {
                '$project': {
                    '_id': 0,
                    'following': 1
                }
            }
        ])
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
                    '_id': currentUser._id,
                    'following': new mongoose.Types.ObjectId(userId)
                }
            }
        ])

        if (followUser.role === 'customer') {
            if (followedUser.length === 0) {
                return await this.userModel.findOneAndUpdate({ emailAddress }, { $push: { following: new mongoose.Types.ObjectId(userId) } });
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
                    '_id': currentUser._id,
                    'following': new mongoose.Types.ObjectId(userId)
                }
            }
        ])

        if (followedUser.length > 0)
            return await this.userModel.findOneAndUpdate({ emailAddress }, { $pull: { following: new mongoose.Types.ObjectId(userId) } });

        throw new HttpException({ message: `You don't follow this customer!` }, HttpStatus.CONFLICT);
    }

    async alreadyFollowingUser(emailAddress: string, userId: string): Promise<boolean> {
        const currentUser = await this.getUserByEmailAddress(emailAddress);
        const followUser = await this.getUserById(userId);
        const followedUser = await this.userModel.aggregate([
            {
                '$unwind': {
                    'path': '$following'
                }
            }, {
                '$match': {
                    '_id': currentUser._id,
                    'following': new mongoose.Types.ObjectId(userId)
                }
            }
        ])

        if (followedUser.length > 0)
            return true;

        return false;
    }
}