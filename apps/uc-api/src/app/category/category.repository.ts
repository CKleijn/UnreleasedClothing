import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "./category.schema";

@Injectable()
export class CategoryRepository {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryModel.find();
    }

    async getCategoryById(categoryId: string): Promise<Category> {
        return await this.categoryModel.findById({ _id: categoryId })
    }

    async createCategory(category: Category): Promise<Category> {
        return await this.categoryModel.create(category);
    }

    async updateCategory(categoryId: string, newCategory: Partial<Category>): Promise<Category> {
        return await this.categoryModel.findOneAndUpdate({ _id: categoryId }, newCategory, { new: true });
    }

    async deleteCategory(categoryId: string): Promise<Category> {
        return await this.categoryModel.findOneAndDelete({ _id: categoryId });
    }
}