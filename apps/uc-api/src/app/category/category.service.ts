import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { CategoryDto } from "./category.dto";
import { Category } from "./category.schema";

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

    async getAllCategories(): Promise<Category[]> {
        const categories = await this.categoryModel.aggregate([
            {
                '$lookup': {
                    'from': 'users', 
                    'localField': 'createdBy', 
                    'foreignField': '_id', 
                    'as': 'user'
                }
            }, {
                '$set': {
                    'createdBy': {
                        '$first': '$user'
                    }
                }
            }, {
                '$project': {
                    'user': 0
                }
            }
        ]);

        return categories;
    }

    async getCategoryById(categoryId: string): Promise<Category> {
        const category = await this.categoryModel.aggregate([
            {
                '$match': {
                    '_id': new mongoose.Types.ObjectId(categoryId)
                }
            },
            {
                '$lookup': {
                    'from': 'users', 
                    'localField': 'createdBy', 
                    'foreignField': '_id', 
                    'as': 'user'
                }
            }, {
                '$set': {
                    'createdBy': {
                        '$first': '$user'
                    }
                }
            }, {
                '$project': {
                    'user': 0
                }
            }
        ]);

        if(!category)
            throw new HttpException(`This category doesn't exists!`, HttpStatus.NOT_FOUND)

        return category[0];
    }

    async createCategory(user: any, categoryDto: CategoryDto): Promise<void> {
        await this.categoryModel.create({
            ...categoryDto,
            createdAt: new Date(),
            createdBy: user._id
        });
    }

    async updateCategory(user: any, categoryId: string, newCategory: Partial<CategoryDto>): Promise<void> {
        const category = await this.categoryModel.findById({ _id: categoryId });
        
        if(!user._id.equals(category.createdBy))
            throw new UnauthorizedException({ message: `This user don't have access to this method!` });
        
        await this.categoryModel.findOneAndUpdate({ _id: categoryId }, newCategory, { new: true });
    }

    async deleteCategory(user: any, categoryId: string): Promise<void> {
        const category = await this.categoryModel.findById({ _id: categoryId });
        
        if(!user._id.equals(category.createdBy))
            throw new UnauthorizedException({ message: `This user don't have access to this method!` });

        await this.categoryModel.findOneAndDelete({ _id: categoryId });
    }
}