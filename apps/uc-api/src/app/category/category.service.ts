import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryDto } from "./category.dto";
import { Category } from "./category.schema";

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryModel.find();
    }

    async getCategoryById(categoryId: string): Promise<Category> {
        const category = await this.categoryModel.findById({ _id: categoryId });

        if(!category)
            throw new HttpException(`This category doesn't exists!`, HttpStatus.NOT_FOUND)

        return category;
    }

    async createCategory(user: any, categoryDto: CategoryDto): Promise<Category> {
        return await this.categoryModel.create({
            ...categoryDto,
            createdAt: new Date(),
            createdBy: user._id
        });
    }

    async updateCategory(user: any, categoryId: string, newCategory: Partial<CategoryDto>): Promise<Category> {
        const category = await this.getCategoryById(categoryId);

        if(user._id.equals(category.createdBy)) 
            return await this.categoryModel.findOneAndUpdate({ _id: categoryId }, newCategory, { new: true });

        throw new UnauthorizedException({ message: `This user don't have access to this method!` });
    }

    async deleteCategory(user: any, categoryId: string): Promise<Category> {
        const category = await this.getCategoryById(categoryId);

        if(user._id.equals(category.createdBy)) 
            return await this.categoryModel.findOneAndDelete({ _id: categoryId });

        throw new UnauthorizedException({ message: `This user don't have access to this method!` });
    }
}