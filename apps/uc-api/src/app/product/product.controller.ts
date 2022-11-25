import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UnauthorizedException, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "../auth/roles/role.enum";
import { Roles } from "../auth/roles/roles.decorator";
import { RolesGuard } from "../auth/roles/roles.guard";
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

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.BRAND)
    @Post('product')
    async createProduct(@Request() req: any, @Body() productDto: ProductDto): Promise<Object> {
        try {
            const createdProduct = await this.productService.createProduct(req.user, productDto);

            return {
                status: 201,
                message: 'Product has been successfully created!',
                product: createdProduct
            }
        } catch (error) {
            this.generateProductExceptions(error);
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.BRAND)
    @Put('product/:productId')
    async updateProduct(@Request() req: any, @Param('productId') productId: string, @Body() newProduct: Partial<ProductDto>): Promise<Object> {
        try {
            const updatedProduct = await this.productService.updateProduct(req.user, productId, newProduct);

            return {
                status: 200,
                message: 'Product has been successfully updated!',
                product: updatedProduct
            }
        } catch (error) {
            this.generateProductExceptions(error);
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.BRAND)
    @Delete('product/:productId')
    async deleteProduct(@Request() req: any, @Param('productId') productId: string): Promise<Object> {
        try {
            await this.productService.deleteProduct(req.user, productId);

            return {
                status: 200,
                message: 'Product has been successfully deleted!'
            }
        } catch (error) {
            this.generateProductExceptions(error);
        }
    }

    generateProductExceptions(error: any) {
        if(error?.response)
            throw new HttpException('This product doesnt exists!', HttpStatus.NOT_FOUND)

        if(error?.response?.message)
            throw new UnauthorizedException(error?.response?.message);
            
        if(error?.name === 'CastError')
            throw new HttpException('This ObjectId doesnt exists!', HttpStatus.NOT_FOUND)

        if(error?.errors?.name)
            throw new HttpException(error.errors.name.message, HttpStatus.CONFLICT);

        if(error?.errors?.picture)
            throw new HttpException(error.errors.picture.message, HttpStatus.CONFLICT);
        
        if(error?.errors?.price)
            throw new HttpException(error.errors.price.message, HttpStatus.CONFLICT);
            
        if(error?.errors?.description)
            throw new HttpException(error.errors.description.message, HttpStatus.CONFLICT);
    }
}