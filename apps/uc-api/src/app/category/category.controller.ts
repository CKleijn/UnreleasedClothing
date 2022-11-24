import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { CategoryDto } from "./category.dto";
import { Category } from "./category.schema";
import { CategoryService } from "./category.service";

@Controller()
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get('categories')
    async getAllCategories(): Promise<Category[]> {
        return await this.categoryService.getAllCategories();
    }

    @Get('category/:categoryId')
    async getCategoryById(@Param('categoryId') categoryId: string): Promise<Category> {
        try {
            return await this.categoryService.getCategorieById(categoryId);
        } catch (error) {
            this.generateCategoryExceptions(error);
        }
    }

    @Post('category')
    async createCategory(@Body() categoryDto: CategoryDto): Promise<Category> {
        try {
            return await this.categoryService.createCategory(categoryDto);
        } catch (error) {
            this.generateCategoryExceptions(error);
        }
    }

    @Put('category/:categoryId')
    async updateCategory(@Param('categoryId') categoryId: string, @Body() newCategory: Partial<CategoryDto>): Promise<Category> {
        try {
            return await this.categoryService.updateCategory(categoryId, newCategory);
        } catch (error) {
            this.generateCategoryExceptions(error);
        }
    }

    @Delete('category/:categoryId')
    async deleteCategory(@Param('categoryId') categoryId: string): Promise<Category> {
        try {
            return await this.categoryService.deleteCategory(categoryId);
        } catch (error) {
            this.generateCategoryExceptions(error);
        }
    }

    generateCategoryExceptions(error: any) {
        if(error.name === 'CastError')
            throw new HttpException('This ObjectId doesnt exists!', HttpStatus.NOT_FOUND)

        if(error.errors.title)
            throw new HttpException(error.errors.title.message, HttpStatus.CONFLICT);

        if(error.errors.description)
            throw new HttpException(error.errors.description.message, HttpStatus.CONFLICT);

        if(error.errors.icon)
            throw new HttpException(error.errors.icon.message, HttpStatus.CONFLICT);
    }
}