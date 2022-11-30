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
        return await this.productService.getCommentById(productId, commentId);
    }

    async createComment(user: any, productId: string, commentDto: CommentDto): Promise<void> {
        const comment = {
            _id: new mongoose.Types.ObjectId(),
            title: commentDto.title,
            body: commentDto.body,
            rating: await this.ratingService.getRatingById(commentDto.ratingId),
            createdBy: user._id,
            createdAt: new Date()
        }
        
        await this.productService.addCommentToProduct(productId, comment);
    }

    async updateComment(user: any, productId: string, commentId: string, newComment: Partial<CommentDto>): Promise<void> {
        if(newComment.ratingId)
            newComment.rating = await this.ratingService.getRatingById(newComment.ratingId);

        await this.productService.updateCommentFromProduct(user, productId, commentId, newComment);
    }

    async deleteComment(user: any, productId: string, commentId: string): Promise<void> {
        await this.productService.deleteCommentFromProduct(user, productId, commentId);
    }
}