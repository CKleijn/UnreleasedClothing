import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { CategoryDto } from "./category.dto";
import { Category } from "./category.schema";

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryModel.find({}).populate('createdBy');
    }

    async getCategoryById(categoryId: string): Promise<Category> {
        const category = await this.categoryModel.findById({ _id: new mongoose.Types.ObjectId(categoryId) }).populate('createdBy');

        if (!category)
            throw new HttpException(`This category doesn't exists!`, HttpStatus.NOT_FOUND)

        return category;
    }

    async createCategory(user: any, categoryDto: CategoryDto): Promise<void> {
        const uniqueCategory = this.categoryModel.findOne({ title: categoryDto.title });

        if (uniqueCategory)
            throw new HttpException('This category title already exists!', HttpStatus.CONFLICT);

        await this.categoryModel.create({
            ...categoryDto,
            createdAt: new Date(),
            createdBy: user._id
        });
    }

    async updateCategory(user: any, categoryId: string, newCategory: Partial<CategoryDto>): Promise<void> {
        const category = await this.categoryModel.findById({ _id: categoryId });
        const uniqueCategory = this.categoryModel.findOne({ title: newCategory?.title });

        if (!user._id.equals(category.createdBy))
            throw new UnauthorizedException({ message: `This user don't have access to this method!` });

        if (uniqueCategory)
            throw new HttpException('This category title already exists!', HttpStatus.CONFLICT);

        await this.categoryModel.findOneAndUpdate({ _id: categoryId }, newCategory, {
            upsert: true,
            new: true,
            runValidators: true,
            setDefaultsOnInsert: true
        });
    }

    async deleteCategory(user: any, categoryId: string): Promise<void> {
        const category = await this.categoryModel.findById({ _id: categoryId });

        if (!user._id.equals(category.createdBy))
            throw new UnauthorizedException({ message: `This user don't have access to this method!` });

        await this.categoryModel.findOneAndDelete({ _id: categoryId });
    }
}