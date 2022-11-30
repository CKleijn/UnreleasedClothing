import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoryModule } from "../category/category.module";
import { RatingModule } from "../rating/rating.module";
import { UserModule } from "../user/user.module";
import { ProductController } from "./product.controller";
import { Product, ProductSchema } from "./product.schema";
import { ProductService } from "./product.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), forwardRef(() => UserModule), CategoryModule, RatingModule],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})

export class ProductModule {};