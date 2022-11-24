import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./product.schema";

@Injectable()
export class ProductRepository {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

    async getAllProducts(): Promise<Product[]> {
        return await this.productModel.find();
    }

    async getProductById(productId: string): Promise<Product> {
        return await this.productModel.findById({ _id: productId })
    }

    async createProduct(product: Product): Promise<Product> {
        return await this.productModel.create(product);
    }

    async updateProduct(productId: string, newProduct: Partial<Product>): Promise<Product> {
        return await this.productModel.findOneAndUpdate({ _id: productId }, newProduct, { new: true });
    }

    async deleteProduct(productId: string): Promise<Product> {
        return await this.productModel.findOneAndDelete({ _id: productId });
    }
}