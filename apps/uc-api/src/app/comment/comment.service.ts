import { Injectable} from "@nestjs/common";
import mongoose from "mongoose";
import { ProductService } from "../product/product.service";
import { RatingService } from "../rating/rating.service";
import { CommentDto } from "./comment.dto";
import { Comment } from "./comment.schema";

@Injectable()
export class CommentService {
    constructor(private ratingService: RatingService, private productService: ProductService) {}

    async getAllComments(): Promise<Comment[]> {
        return await this.productService.getAllComments();
    }

    async getAllCommentsFromUser(userId: string): Promise<Comment[]> {
        return await this.productService.getAllCommentsFromUser(userId);
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
            rating: await this.ratingService.getRatingById(commentDto.rating.toString()),
            createdBy: user._id,
            createdAt: new Date()
        }

        await this.productService.addCommentToProduct(productId, comment);
    }

    async updateComment(user: any, productId: string, commentId: string, newComment: Partial<CommentDto>): Promise<void> {
        if(newComment?.rating)
            newComment.rating = await this.ratingService.getRatingById(newComment.rating.toString());
        
        await this.productService.updateCommentFromProduct(user, productId, commentId, newComment);
    }

    async deleteComment(user: any, productId: string, commentId: string): Promise<void> {
        return await this.productService.deleteCommentFromProduct(user, productId, commentId);
    }
}