import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../user/user.module";
import { CommentController } from "./comment.controller";
import { Comment, CommentSchema } from "./comment.schema";
import { CommentService } from "./comment.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]), forwardRef(() => UserModule)],
    controllers: [CommentController],
    providers: [CommentService],
})

export class CommentModule {};