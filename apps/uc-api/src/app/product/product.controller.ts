import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ProductDto } from "./product.dto";
import { Product } from "./product.schema";
import { ProductService } from "./product.service";

@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('products')
    async getAllProducts(): Promise<Product[]> {
        return await this.productService.getAllProducts();
    }

    @Get('product/:productId')
    async getProductById(@Param('productId') productId: string): Promise<Product> {
        try {
            return await this.productService.getProductById(productId);
        } catch (error) {
            this.generateProductExceptions(error);
        }
    }

    @Post('product')
    async createProduct(@Body() productDto: ProductDto): Promise<Product> {
        try {
            return await this.productService.createProduct(productDto);
        } catch (error) {
            this.generateProductExceptions(error);
        }
    }

    @Put('product/:productId')
    async updateProduct(@Param('productId') productId: string, @Body() newProduct: Partial<ProductDto>): Promise<Product> {
        try {
            return await this.productService.updateProduct(productId, newProduct);
        } catch (error) {
            this.generateProductExceptions(error);
        }
    }

    @Delete('product/:productId')
    async deleteProduct(@Param('productId') productId: string): Promise<Product> {
        try {
            return await this.productService.deleteProduct(productId);
        } catch (error) {
            this.generateProductExceptions(error);
        }
    }

    generateProductExceptions(error: any) {
        if(error.name === 'CastError')
            throw new HttpException('This ObjectId doesnt exists!', HttpStatus.NOT_FOUND)

        if(error.errors.name)
            throw new HttpException(error.errors.name.message, HttpStatus.CONFLICT);

        if(error.errors.picture)
            throw new HttpException(error.errors.picture.message, HttpStatus.CONFLICT);
        
        if(error.errors.price)
            throw new HttpException(error.errors.price.message, HttpStatus.CONFLICT);
            
        if(error.errors.description)
            throw new HttpException(error.errors.description.message, HttpStatus.CONFLICT);
    }
}