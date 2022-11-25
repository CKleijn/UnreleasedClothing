import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductDto } from "./product.dto";
import { Product } from "./product.schema";

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

    async getAllProducts(): Promise<Product[]> {
        return await this.productModel.find();
    }

    async getProductById(productId: string): Promise<Product> {
        const product = await this.productModel.findById({ _id: productId });

        if(!product)
            throw new HttpException('This product doesnt exists!', HttpStatus.NOT_FOUND)

        return product;
    }

    async createProduct(user: any, productDto: ProductDto): Promise<Product> {
        return await this.productModel.create({
            name: productDto.name,
            picture: productDto.picture,
            price: productDto.price,
            description: productDto.description,
            isActive: true,
            createdAt: new Date(),
            createdBy: user._id
        });
    }

    async updateProduct(user: any, productId: string, newProduct: Partial<ProductDto>): Promise<Product> {
        const product = await this.getProductById(productId);

        if(user._id.equals(product.createdBy))
            return await this.productModel.findOneAndUpdate({ _id: productId }, newProduct, { new: true });

        throw new UnauthorizedException({ message: "This user don't have access to this method!" });
    }

    async deleteProduct(user: any, productId: string): Promise<Product> {
        const product = await this.getProductById(productId);

        if(user._id.equals(product.createdBy))
            return await this.productModel.findOneAndDelete({ _id: productId });

        throw new UnauthorizedException({ message: "This user don't have access to this method!" });
    }
}