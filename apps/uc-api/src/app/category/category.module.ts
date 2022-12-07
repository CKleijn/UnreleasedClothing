import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { IconModule } from "../icon/icon.module";
import { ProductModule } from "../product/product.module";
import { CategoryController } from "./category.controller";
import { Category, CategorySchema } from "./category.schema";
import { CategoryService } from "./category.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]), forwardRef(() => ProductModule), IconModule],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService]
})

export class CategoryModule {};