import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductDto } from "./product.dto";
import { Product } from "./product.schema";
import { ProductService } from "./product.service";

@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('products')
    async getAllProducts(): Promise<Product[]> {
        return this.productService.getAllProducts();
    }

    @Get('product/:productId')
    async getProductById(@Param('productId') productId: string): Promise<Product> {
        return this.productService.getProductById(productId);
    }

    @Post('product')
    async createProduct(@Body() productDto: ProductDto): Promise<Product> {
        return this.productService.createProduct(productDto);
    }

    @Put('product/:productId')
    async updateProduct(@Param('productId') productId: string, @Body() newProduct: Partial<Product>): Promise<Product> {
        return this.productService.updateProduct(productId, newProduct);
    }

    @Delete('product/:productId')
    async deleteProduct(@Param('productId') productId: string): Promise<Product> {
        return this.productService.deleteProduct(productId);
    }
}