import { Inject, Injectable} from "@nestjs/common";
import mongoose from "mongoose";
import { ProductService } from "../product/product.service";
import { CommentDto } from "./comment.dto";
import { Comment } from "./comment.schema";

@Injectable()
export class CommentService {
    constructor(@Inject(ProductService) private productService: ProductService) {}

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
            rating: commentDto.rating,
            createdBy: user._id,
            createdAt: new Date()
        }

        await this.productService.addCommentToProduct(productId, comment);
    }

    async updateComment(user: any, productId: string, commentId: string, newComment: Partial<CommentDto>): Promise<void> {
        await this.productService.updateCommentFromProduct(user, productId, commentId, newComment);
    }

    async deleteComment(user: any, productId: string, commentId: string): Promise<void> {
        return await this.productService.deleteCommentFromProduct(user, productId, commentId);
    }
}