import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoryModule } from "../category/category.module";
import { IconModule } from "../icon/icon.module";
import { UserModule } from "../user/user.module";
import { ProductController } from "./product.controller";
import { Product, ProductSchema } from "./product.schema";
import { ProductService } from "./product.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), forwardRef(() => UserModule), forwardRef(() => CategoryModule), IconModule],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})

export class ProductModule {};