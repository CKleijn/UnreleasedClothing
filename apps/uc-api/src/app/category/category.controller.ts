import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "../auth/roles/role.enum";
import { Roles } from "../auth/roles/roles.decorator";
import { RolesGuard } from "../auth/roles/roles.guard";
import { CategoryDto } from "./category.dto";
import { Category } from "./category.schema";
import { CategoryService } from "./category.service";

@Controller()
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get('categories')
    async getCategories(): Promise<Category[]> {
        return await this.categoryService.getCategories();
    }

    @Get('categories/all')
    async getAllCategories(): Promise<Category[]> {
        return await this.categoryService.getAllCategories();
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('categories/:userId')
    async getAllCategoriesFromUser(@Param('userId') userId: string): Promise<Category[]> {
        return await this.categoryService.getAllCategoriesFromUser(userId);
    }

    @Get('category/:categoryId')
    async getCategoryById(@Param('categoryId') categoryId: string): Promise<Category> {
        try {
            return await this.categoryService.getCategoryById(categoryId);
        } catch (error) {
            this.generateCategoryExceptions(error);
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.BRAND)
    @Post('category')
    async createCategory(@Request() req: any, @Body() categoryDto: CategoryDto): Promise<Object> {
        try {
            await this.categoryService.createCategory(req.user, categoryDto);

            return {
                status: 201,
                message: 'Category has been succesfully created!'
            }
        } catch (error) {
            this.generateCategoryExceptions(error);
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.BRAND)
    @Put('category/:categoryId')
    async updateCategory(@Request() req: any, @Param('categoryId') categoryId: string, @Body() newCategory: Partial<CategoryDto>): Promise<Object> {
        try {
            await this.categoryService.updateCategory(req.user, categoryId, newCategory);

            return {
                status: 200,
                message: 'Category has been succesfully updated!'
            }
        } catch (error) {
            this.generateCategoryExceptions(error);
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.BRAND)
    @Delete('category/:categoryId')
    async deleteCategory(@Request() req: any, @Param('categoryId') categoryId: string): Promise<Object> {
        try {
            await this.categoryService.deleteCategory(req.user, categoryId);

            return {
                status: 200,
                message: 'Category has been succesfully deleted!'
            }
        } catch (error) {
            this.generateCategoryExceptions(error);
        }
    }

    generateCategoryExceptions(error: any) {
        if(error?.name === 'CastError')
            throw new HttpException(`This category doesn't exists!`, HttpStatus.NOT_FOUND)

        if(error?.response === `This category can't be deleted, because products are linked to this category!`)
            throw new HttpException(`This category can't be deleted, because products are linked to this category!`, HttpStatus.CONFLICT);

        if(error?.response === 'This category title already exists!')
            throw new HttpException('This category title already exists!', HttpStatus.CONFLICT);

        if(error?.response === `This category can't be put offline, because it's connected to products!`)
            throw new HttpException(`This category can't be put offline, because it's connected to products!`, HttpStatus.CONFLICT);

        if(error?.response?.message)
            throw new UnauthorizedException(error?.response?.message);

        if(error?.errors?.title)
            throw new HttpException(error.errors.title.message, HttpStatus.CONFLICT);

        if(error?.errors?.description)
            throw new HttpException(error.errors.description.message, HttpStatus.CONFLICT);

        if(error?.errors?.icon)
            throw new HttpException(error.errors.icon.message, HttpStatus.CONFLICT);

        if(error?.errors?.isActive)
            throw new HttpException(error.errors.isActive.message, HttpStatus.CONFLICT);
    }
}