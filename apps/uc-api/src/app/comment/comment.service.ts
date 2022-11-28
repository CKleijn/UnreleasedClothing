import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Product } from "../product/product.schema";
import { ProductService } from "../product/product.service";
import { RatingService } from "../rating/rating.service";
import { CommentDto } from "./comment.dto";
import { Comment } from "./comment.schema";

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>, private ratingService: RatingService, private productService: ProductService) {}

    async getAllComments(): Promise<Comment[]> {
        return await this.productService.getAllComments();
    }
    
    async getAllCommentsFromProduct(productId: string): Promise<Comment[]> {
        return await this.productService.getAllCommentsFromProduct(productId);
    }

    async getCommentById(productId: string, commentId: string): Promise<Comment> {
        const comment = await this.productService.getCommentById(productId, commentId);

        if(!comment)
            throw new HttpException(`This comment doesn't exists!`, HttpStatus.NOT_FOUND)

        return comment;
    }

    async createComment(user: any, productId: string, commentDto: CommentDto): Promise<Product> {
        const comment = {
            _id: new mongoose.Types.ObjectId(),
            title: commentDto.title,
            body: commentDto.body,
            rating: await this.ratingService.getRatingById(commentDto.ratingId),
            createdBy: user._id,
            createdAt: new Date()
        }
        
        return await this.productService.addCommentToProduct(productId, comment);
    }

    async updateComment(user: any, productId: string, commentId: string, newComment: Partial<CommentDto>): Promise<Comment> {
        const comment = await this.getCommentById(productId, commentId);

        if(user._id.equals(comment.createdBy._id)) {
            if(newComment.ratingId)
                newComment.rating = await this.ratingService.getRatingById(newComment.ratingId);

            return await this.productService.updateCommentFromProduct(user, productId, commentId, newComment);
        }

        throw new UnauthorizedException({ message: `This user don't have access to this method!` });
    }

    async deleteComment(user: any, productId: string, commentId: string): Promise<Comment> {
        const comment = await this.getCommentById(productId, commentId);

        if(user._id.equals(comment.createdBy._id)) 
            return await this.productService.deleteCommentFromProduct(user, productId, commentId);

        throw new UnauthorizedException({ message: `This user don't have access to this method!` });
    }
}