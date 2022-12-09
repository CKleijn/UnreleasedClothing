import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoryModule } from "../category/category.module";
import { IconModule } from "../icon/icon.module";
import { Neo4jModule } from "../neo4j/neo4j.module";
import { UserModule } from "../user/user.module";
import { ProductController } from "./product.controller";
import { Product, ProductSchema } from "./product.schema";
import { ProductService } from "./product.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), forwardRef(() => UserModule), forwardRef(() => CategoryModule), IconModule, 
    // Neo4jModule.forRoot({
    //     scheme: 'bolt',
    //     host: '127.0.0.1',
    //     port: 7687,
    //     username: 'neo4j',
    //     password: 'password',
    // })
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})

export class ProductModule {};