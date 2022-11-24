import { Injectable } from "@nestjs/common";
import { CategoryDto } from "./category.dto";
import { CategoryRepository } from "./category.repository";
import { Category } from "./category.schema";

@Injectable()
export class CategoryService {
    constructor(private categoryRepository: CategoryRepository) {}

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.getAllCategories();
    }

    async getCategorieById(categoryId: string): Promise<Category> {
        return await this.categoryRepository.getCategoryById(categoryId);
    }

    async createCategory(categoryDto: CategoryDto): Promise<Category> {
        return await this.categoryRepository.createCategory({
            title: categoryDto.title,
            description: categoryDto.description,
            icon: categoryDto.icon,
            createdAt: new Date()
        })
    }

    async updateCategory(categoryId: string, newCategory: Partial<CategoryDto>): Promise<Category> {
        return await this.categoryRepository.updateCategory(categoryId, newCategory);
    }

    async deleteCategory(categoryId: string): Promise<Category> {
        return await this.categoryRepository.deleteCategory(categoryId);
    }
}