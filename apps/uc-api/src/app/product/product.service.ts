// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { Model } from "mongoose";
// import { User } from "./user.schema";

import { Injectable } from "@nestjs/common";
import { ProductDto } from "./product.dto";
import { ProductRepository } from "./product.repository";
import { Product } from "./product.schema";

@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository) {}

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.getAllProducts();
    }

    async getProductById(productId: string): Promise<Product> {
        return await this.productRepository.getProductById(productId);
    }

    async createProduct(productDto: ProductDto): Promise<Product> {
        return await this.productRepository.createProduct({
            name: productDto.name,
            picture: productDto.picture,
            price: productDto.price,
            description: productDto.description,
            isActive: true,
            createdAt: new Date()
        })
    }

    async updateProduct(productId: string, newProduct: Partial<ProductDto>): Promise<Product> {
        return await this.productRepository.updateProduct(productId, newProduct);
    }

    async deleteProduct(productId: string): Promise<Product> {
        return await this.productRepository.deleteProduct(productId);
    }
}