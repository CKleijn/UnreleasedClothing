import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "../auth/roles/role.enum";
import { Roles } from "../auth/roles/roles.decorator";
import { RolesGuard } from "../auth/roles/roles.guard";
import { CommentDto } from "./comment.dto";
import { Comment } from "./comment.schema";
import { CommentService } from "./comment.service";

@Controller()
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get('comments')
    async getAllComments(): Promise<Comment[]> {
        return await this.commentService.getAllComments();
    }

    @Get('product/:productId/comments')
    async getAllCommentsFromProduct(@Param('productId') productId: string): Promise<Comment[]> {
        return await this.commentService.getAllCommentsFromProduct(productId);
    }

    @Get('product/:productId/comment/:commentId')
    async getCommentById(@Param('productId') productId: string, @Param('commentId') commentId: string): Promise<Comment> {
        try {
            return await this.commentService.getCommentById(productId, commentId);
        } catch (error) {
            this.generateCommentExceptions(error);
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.CUSTOMER)
    @Post('product/:productId/comment')
    async createComment(@Request() req: any, @Param('productId') productId: string, @Body() commentDto: CommentDto): Promise<Object> {
        try {
            await this.commentService.createComment(req.user, productId, commentDto);

            return {
                status: 201,
                message: 'Comment has been succesfully created!'
            }
        } catch (error) {
            this.generateCommentExceptions(error);
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.CUSTOMER)
    @Put('product/:productId/comment/:commentId')
    async updateComment(@Request() req: any, @Param('productId') productId: string, @Param('commentId') commentId: string, @Body() newComment: Partial<CommentDto>): Promise<Object> {
        try {
            await this.commentService.updateComment(req.user, productId, commentId, newComment);

            return {
                status: 200,
                message: 'Comment has been succesfully updated!'
            }
        } catch (error) {
            this.generateCommentExceptions(error);
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.CUSTOMER)
    @Delete('product/:productId/comment/:commentId')
    async deleteComment(@Request() req: any, @Param('productId') productId: string, @Param('commentId') commentId: string): Promise<Object> {
        try {
            await this.commentService.deleteComment(req.user, productId, commentId);

            return {
                status: 200,
                message: 'Comment has been succesfully deleted!'
            }
        } catch (error) {
            this.generateCommentExceptions(error);
        }
    }

    generateCommentExceptions(error: any) {
        if(error?.response || error?.name === 'CastError')
            throw new HttpException(`This comment doesn't exists!`, HttpStatus.NOT_FOUND)

        if(error?.response?.message)
            throw new UnauthorizedException(error?.response?.message);

        if(error?.errors?.title)
            throw new HttpException(error.errors.title.message, HttpStatus.CONFLICT);

        if(error?.errors?.body)
            throw new HttpException(error.errors.body.message, HttpStatus.CONFLICT);

        if(error?.errors?.rating)
            throw new HttpException(error.errors.rating.message, HttpStatus.CONFLICT);
    }
}