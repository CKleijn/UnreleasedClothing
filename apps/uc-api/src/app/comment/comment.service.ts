import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserService } from "../user/user.service";
import { CommentDto } from "./comment.dto";
import { Comment } from "./comment.schema";

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>, private userService: UserService) {}

    async getAllComments(): Promise<Comment[]> {
        return await this.commentModel.find();
    }

    async getCommentById(commentId: string): Promise<Comment> {
        const comment = await this.commentModel.findById({ _id: commentId });

        if(!comment)
            throw new HttpException('This comment doesnt exists!', HttpStatus.NOT_FOUND)

        return comment;
    }

    async createComment(user: any, commentDto: CommentDto): Promise<Comment> {
        return await this.commentModel.create({
            title: commentDto.title,
            body: commentDto.body,
            rating: commentDto.rating,
            createdAt: new Date(),
            createdBy: await this.userService.getUserByEmailAddress(user.emailAddress)
        });
    }

    async updateComment(user: any, commentId: string, newComment: Partial<CommentDto>): Promise<Comment> {
        const comment = await this.getCommentById(commentId);

        if(user._id.equals(comment.createdBy._id)) 
            return await this.commentModel.findOneAndUpdate({ _id: commentId }, newComment, { new: true });

        throw new UnauthorizedException({ message: "This user don't have access to this method!" });
    }

    async deleteComment(user: any, commentId: string): Promise<Comment> {
        const comment = await this.getCommentById(commentId);

        if(user._id.equals(comment.createdBy._id)) 
            return await this.commentModel.findOneAndDelete({ _id: commentId });

        throw new UnauthorizedException({ message: "This user don't have access to this method!" });
    }
}