import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from "../product/product.module";
import { RatingModule } from "../rating/rating.module";
import { CommentController } from "./comment.controller";
import { Comment, CommentSchema } from "./comment.schema";
import { CommentService } from "./comment.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]), ProductModule, RatingModule],
    controllers: [CommentController],
    providers: [CommentService],
    exports: [CommentService]
})

export class CommentModule {};