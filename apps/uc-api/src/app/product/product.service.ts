import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { CategoryService } from "../category/category.service";
import { Comment } from "../comment/comment.schema";
import { CommentDto } from "../comment/comment.dto";
import { UserService } from "../user/user.service";
import { ProductDto } from "./product.dto";
import { Product } from "./product.schema";

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>, private categoryService: CategoryService, private userService: UserService) {}

    async getAllProducts(): Promise<Product[]> {
        return await this.productModel.find();
    }

    async getAllComments(): Promise<Comment[]> {
        return [].concat(await this.productModel.find({}, { _id: 0, comments: 1 }))[0].comments;
    }

    async getAllCommentsFromProduct(productId: string): Promise<Comment[]> {
        return [].concat(await this.productModel.find({ _id: productId }, { _id: 0, comments: 1 }))[0].comments;
    }

    async getProductById(productId: string): Promise<Product> {
        const product = await this.productModel.findById({ _id: productId });

        if(!product)
            throw new HttpException(`This product doesn't exists!`, HttpStatus.NOT_FOUND)

        return product;
    }

    async getCommentById(productId: string, commentId: string): Promise<Comment> {
        const comment = [].concat(await this.productModel.findOne({ _id: productId, 'comments._id': new mongoose.Types.ObjectId(commentId) }, { _id: 0, comments: 1 }, { 'comments.$': 1 }))[0].comments[0];

        if(!comment)
            throw new HttpException(`This comment doesn't exists!`, HttpStatus.NOT_FOUND)

        return comment;
    }

    async createProduct(user: any, productDto: ProductDto): Promise<Product> {
        return await this.productModel.create({
            name: productDto.name,
            picture: productDto.picture,
            price: productDto.price,
            description: productDto.description,
            category: await this.categoryService.getCategoryById(productDto.category),
            comments: [],
            isActive: true,
            createdAt: new Date(),
            createdBy: await this.userService.getUserByEmailAddress(user.emailAddress)
        });
    }

    async addCommentToProduct(productId: string, newComment: Partial<CommentDto>): Promise<Product> {
        return await this.productModel.findOneAndUpdate({ _id: productId }, { $push: { comments: newComment } }, { new: true });
    }

    async updateProduct(user: any, productId: string, newProduct: Partial<ProductDto>): Promise<Product> {
        const product = await this.getProductById(productId);

        if(user._id.equals(product.createdBy))
            return await this.productModel.findOneAndUpdate({ _id: productId }, newProduct, { new: true });

        throw new UnauthorizedException({ message: `This user don't have access to this method!` });
    }

    async updateCommentFromProduct(user: any, productId: string, commentId: string, newComment: Partial<CommentDto>): Promise<Comment> {
        const oldComment = await this.getCommentById(productId, commentId);

        if(user._id.equals(oldComment.createdBy._id)) {
            const updateComment = await this.productModel.findOneAndUpdate({ _id: productId, 'comments._id': new mongoose.Types.ObjectId(commentId) }, { $set: { 'comments.$.title': newComment?.title, 'comments.$.body': newComment?.body, 'comments.$.rating': newComment?.rating } });
            
            const comment = await this.getCommentById(productId, commentId);

            return comment;
        }

        throw new UnauthorizedException({ message: `This user don't have access to this method!` });
    }

    async deleteProduct(user: any, productId: string): Promise<Product> {
        const product = await this.getProductById(productId);

        if(user._id.equals(product.createdBy))
            return await this.productModel.findOneAndDelete({ _id: productId });

        throw new UnauthorizedException({ message: `This user don't have access to this method!` });
    }

    async deleteCommentFromProduct(user: any, productId: string, commentId: string): Promise<Comment> {
        const comment = await this.getCommentById(productId, commentId);

        if(user._id.equals(comment.createdBy._id))
            return await this.productModel.findOneAndUpdate({ _id: productId, 'comments._id': new mongoose.Types.ObjectId(commentId) }, { $pull: { 'comments': { _id: new mongoose.Types.ObjectId(commentId) } } }, { new: true });
    
        throw new UnauthorizedException({ message: `This user don't have access to this method!` });
    }
}

// Dubbele validatie beide services