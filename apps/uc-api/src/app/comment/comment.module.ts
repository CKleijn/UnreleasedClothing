import { Module } from "@nestjs/common";
import { ProductModule } from "../product/product.module";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";


@Module({
    imports: [ProductModule],
    controllers: [CommentController],
    providers: [CommentService],
    exports: [CommentService]
})

export class CommentModule {};