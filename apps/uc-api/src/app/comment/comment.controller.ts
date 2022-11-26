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

    @Get('comment/:commentId')
    async getCommentById(@Param('commentId') commentId: string): Promise<Comment> {
        try {
            return await this.commentService.getCommentById(commentId);
        } catch (error) {
            this.generateCommentExceptions(error);
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.CUSTOMER)
    @Post('comment')
    async createComment(@Request() req: any, @Body() commentDto: CommentDto): Promise<Object> {
        try {
            const createdComment = await this.commentService.createComment(req.user, commentDto);

            return {
                status: 201,
                message: 'Comment has been succesfully created!',
                comment: createdComment
            }
        } catch (error) {
            this.generateCommentExceptions(error);
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.CUSTOMER)
    @Put('comment/:commentId')
    async updateComment(@Request() req: any, @Param('commentId') commentId: string, @Body() newComment: Partial<CommentDto>): Promise<Object> {
        try {
            const updatedComment = await this.commentService.updateComment(req.user, commentId, newComment);

            return {
                status: 200,
                message: 'Comment has been succesfully updated!',
                comment: updatedComment
            }
        } catch (error) {
            this.generateCommentExceptions(error);
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.CUSTOMER)
    @Delete('comment/:commentId')
    async deleteComment(@Request() req: any, @Param('commentId') commentId: string): Promise<Object> {
        try {
            await this.commentService.deleteComment(req.user, commentId);

            return {
                status: 200,
                message: 'Comment has been succesfully deleted!'
            }
        } catch (error) {
            this.generateCommentExceptions(error);
        }
    }

    generateCommentExceptions(error: any) {
        if(error?.response)
            throw new HttpException('This comment doesnt exists!', HttpStatus.NOT_FOUND)

        if(error?.response?.message)
            throw new UnauthorizedException(error?.response?.message);

        if(error?.name === 'CastError')
            throw new HttpException('This ObjectId doesnt exists!', HttpStatus.NOT_FOUND)

        if(error?.errors?.title)
            throw new HttpException(error.errors.title.message, HttpStatus.CONFLICT);

        if(error?.errors?.body)
            throw new HttpException(error.errors.body.message, HttpStatus.CONFLICT);

        if(error?.errors?.rating)
            throw new HttpException(error.errors.rating.message, HttpStatus.CONFLICT);
    }
}