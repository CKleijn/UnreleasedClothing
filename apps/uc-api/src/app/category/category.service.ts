import { forwardRef, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { IconService } from "../icon/icon.service";
import { ProductService } from "../product/product.service";
import { CategoryDto } from "./category.dto";
import { Category } from "./category.schema";

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>, @Inject(forwardRef(() => ProductService)) private productService: ProductService, @Inject(IconService) private iconService: IconService) { }

    async getCategories(): Promise<Category[]> {
        return await this.categoryModel.find({ isActive: true }).populate('createdBy');
    }

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryModel.find({}).populate('createdBy');
    }

    async getAllCategoriesFromUser(userId: string): Promise<Category[]> {
        return await this.categoryModel.aggregate([
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
                '$match': {
                    'createdBy._id': new mongoose.Types.ObjectId(userId)
                }
            }
        ])
    }

    async getCategoryById(categoryId: string): Promise<Category> {
        const category = await this.categoryModel.findOne({ _id: new mongoose.Types.ObjectId(categoryId) }).populate('createdBy');

        if (!category)
            throw new HttpException(`This category doesn't exists!`, HttpStatus.NOT_FOUND)

        return category;
    }

    async createCategory(user: any, categoryDto: CategoryDto): Promise<void> {
        const uniqueCategory = await this.categoryModel.findOne({ title: categoryDto.title });

        if (uniqueCategory)
            throw new HttpException('This category title already exists!', HttpStatus.CONFLICT);

        await this.categoryModel.create({
            _id: new mongoose.Types.ObjectId(),
            ...categoryDto,
            icon: await this.iconService.getIconById(categoryDto.icon),
            createdAt: new Date(),
            createdBy: user._id
        })
    }

    async updateCategory(user: any, categoryId: string, newCategory: Partial<CategoryDto>): Promise<void> {
        const category = await this.categoryModel.findById({ _id: categoryId });
        const uniqueCategory = await this.categoryModel.findOne({ title: newCategory?.title });
        const products = await this.productService.getAllProductsFromCategory(categoryId);

        if (!user._id.equals(category.createdBy))
            throw new UnauthorizedException({ message: `This user don't have access to this method!` });

        if (uniqueCategory && newCategory?.title !== category.title)
            throw new HttpException('This category title already exists!', HttpStatus.CONFLICT);

        if (products.length > 0 && newCategory?.isActive === false)
            throw new HttpException(`This category can't be put offline, because it's connected to products!`, HttpStatus.CONFLICT);


        await this.categoryModel.findOneAndUpdate({ _id: categoryId },
            {
                title: newCategory?.title,
                description: newCategory?.description,
                icon: await this.iconService.getIconById(newCategory?.icon),
                isActive: newCategory?.isActive
            });

        if (products)
            await this.productService.updateCategoryFromNestedProducts(newCategory, products);
    }

    async deleteCategory(user: any, categoryId: string): Promise<void> {
        const category = await this.categoryModel.findById({ _id: categoryId });
        const products = await this.productService.getAllProductsFromCategory(categoryId);

        if (!user._id.equals(category.createdBy))
            throw new UnauthorizedException({ message: `This user don't have access to this method!` });

        if (products.length > 0)
            throw new HttpException(`This category can't be deleted, because products are linked to this category!`, HttpStatus.CONFLICT);

        await this.categoryModel.findOneAndDelete({ _id: categoryId });
    }
}