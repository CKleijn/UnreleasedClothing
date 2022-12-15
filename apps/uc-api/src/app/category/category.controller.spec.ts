import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { Category } from './category.schema';
import mongoose from 'mongoose';
import { Icon } from '../icon/icon.schema';
import { CategoryDto } from './category.dto';

describe('Category controller - Integration tests', () => {
    let app: TestingModule;
    let categoryController: CategoryController;
    let categoryService: CategoryService;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [CategoryController],
            providers: [{
                provide: CategoryService,
                useValue: {
                    getCategories: jest.fn(),
                    getAllCategories: jest.fn(),
                    getAllCategoriesFromUser: jest.fn(),
                    getCategoryById: jest.fn(),
                    createCategory: jest.fn(),
                    updateCategory: jest.fn(),
                    deleteCategory: jest.fn(),
                },
            }],
        })
        .compile();

        categoryController = app.get<CategoryController>(CategoryController);
        categoryService = app.get<CategoryService>(CategoryService);
    });

    it('should call getCategories on the service', async () => {
        const exampleCategories: Category[] = [
            {
                _id: new mongoose.Types.ObjectId('638fd0ec2a2c5f2af03d4c94'),
                title: 'Category title 1',
                description: 'Category description 1',
                icon: new Icon(),
                isActive: true,
                createdAt: new Date(),
                createdBy: new mongoose.Types.ObjectId('638f5de5d27ce5bb2f5cf79a')
            },
            {
                _id: new mongoose.Types.ObjectId('638fd0ec2a2c5f2af03d4c93'),
                title: 'Category title 2',
                description: 'Category description 2',
                icon: new Icon(),
                isActive: true,
                createdAt: new Date(),
                createdBy: new mongoose.Types.ObjectId('638f5de5d27ce5bb2f5cf79b')
            }
        ]

        const getCategories = jest.spyOn(categoryService, 'getCategories')
            .mockImplementation(async () => exampleCategories);

        const results = await categoryController.getCategories();

        expect(getCategories).toBeCalledTimes(1);
        expect(results).toHaveLength(2);
        expect(results[0]).toHaveProperty('_id', exampleCategories[0]._id);
        expect(results[0]).toHaveProperty('title', exampleCategories[0].title);
        expect(results[0]).toHaveProperty('description', exampleCategories[0].description);
        expect(results[0]).toHaveProperty('icon', exampleCategories[0].icon);
        expect(results[0]).toHaveProperty('isActive', exampleCategories[0].isActive);
        expect(results[0]).toHaveProperty('createdAt', exampleCategories[0].createdAt);
        expect(results[0]).toHaveProperty('createdBy', exampleCategories[0].createdBy);
        expect(results[1]).toHaveProperty('_id', exampleCategories[1]._id);
        expect(results[1]).toHaveProperty('title', exampleCategories[1].title);
        expect(results[1]).toHaveProperty('description', exampleCategories[1].description);
        expect(results[1]).toHaveProperty('icon', exampleCategories[1].icon);
        expect(results[1]).toHaveProperty('isActive', exampleCategories[1].isActive);
        expect(results[1]).toHaveProperty('createdAt', exampleCategories[1].createdAt);
        expect(results[1]).toHaveProperty('createdBy', exampleCategories[1].createdBy);
    });

    it('should call getAllCategories on the service', async () => {
        const exampleCategories: Category[] = [
            {
                _id: new mongoose.Types.ObjectId('638fd0ec2a2c5f2af03d4c94'),
                title: 'Category title 1',
                description: 'Category description 1',
                icon: new Icon(),
                isActive: true,
                createdAt: new Date(),
                createdBy: new mongoose.Types.ObjectId('638f5de5d27ce5bb2f5cf79a')
            },
            {
                _id: new mongoose.Types.ObjectId('638fd0ec2a2c5f2af03d4c93'),
                title: 'Category title 2',
                description: 'Category description 2',
                icon: new Icon(),
                isActive: true,
                createdAt: new Date(),
                createdBy: new mongoose.Types.ObjectId('638f5de5d27ce5bb2f5cf79b')
            }
        ]

        const getAllCategories = jest.spyOn(categoryService, 'getAllCategories')
            .mockImplementation(async () => exampleCategories);

        const results = await categoryController.getAllCategories();

        expect(getAllCategories).toBeCalledTimes(1);
        expect(results).toHaveLength(2);
        expect(results[0]).toHaveProperty('_id', exampleCategories[0]._id);
        expect(results[0]).toHaveProperty('title', exampleCategories[0].title);
        expect(results[0]).toHaveProperty('description', exampleCategories[0].description);
        expect(results[0]).toHaveProperty('icon', exampleCategories[0].icon);
        expect(results[0]).toHaveProperty('isActive', exampleCategories[0].isActive);
        expect(results[0]).toHaveProperty('createdAt', exampleCategories[0].createdAt);
        expect(results[0]).toHaveProperty('createdBy', exampleCategories[0].createdBy);
        expect(results[1]).toHaveProperty('_id', exampleCategories[1]._id);
        expect(results[1]).toHaveProperty('title', exampleCategories[1].title);
        expect(results[1]).toHaveProperty('description', exampleCategories[1].description);
        expect(results[1]).toHaveProperty('icon', exampleCategories[1].icon);
        expect(results[1]).toHaveProperty('isActive', exampleCategories[1].isActive);
        expect(results[1]).toHaveProperty('createdAt', exampleCategories[1].createdAt);
        expect(results[1]).toHaveProperty('createdBy', exampleCategories[1].createdBy);
    });

    it('should call getAllCategoriesFromUser on the service', async () => {
        const exampleCategories: Category[] = [
            {
                _id: new mongoose.Types.ObjectId('638fd0ec2a2c5f2af03d4c94'),
                title: 'Category title 1',
                description: 'Category description 1',
                icon: new Icon(),
                isActive: true,
                createdAt: new Date(),
                createdBy: new mongoose.Types.ObjectId('638f5de5d27ce5bb2f5cf79a')
            }
        ]

        const getAllCategoriesFromUser = jest.spyOn(categoryService, 'getAllCategoriesFromUser')
            .mockImplementation(async () => exampleCategories);

        const userId = '638f5de5d27ce5bb2f5cf79a';

        const results = await categoryController.getAllCategoriesFromUser(userId);

        expect(getAllCategoriesFromUser).toBeCalledTimes(1);
        expect(results).toHaveLength(1);
        expect(results[0]).toHaveProperty('_id', exampleCategories[0]._id);
        expect(results[0]).toHaveProperty('title', exampleCategories[0].title);
        expect(results[0]).toHaveProperty('description', exampleCategories[0].description);
        expect(results[0]).toHaveProperty('icon', exampleCategories[0].icon);
        expect(results[0]).toHaveProperty('isActive', exampleCategories[0].isActive);
        expect(results[0]).toHaveProperty('createdAt', exampleCategories[0].createdAt);
        expect(results[0]).toHaveProperty('createdBy', exampleCategories[0].createdBy);
    });

    it('should call getCategoryById on the service', async () => {
        const exampleCategory: Category = {
            _id: new mongoose.Types.ObjectId('638fd0ec2a2c5f2af03d4c94'),
            title: 'Category title 1',
            description: 'Category description 1',
            icon: new Icon(),
            isActive: true,
            createdAt: new Date(),
            createdBy: new mongoose.Types.ObjectId('638f5de5d27ce5bb2f5cf79a')
        }

        const getCategoryById = jest.spyOn(categoryService, 'getCategoryById')
            .mockImplementation(async () => exampleCategory);

        const categoryId = '638fd0ec2a2c5f2af03d4c94';

        const result = await categoryController.getCategoryById(categoryId);

        expect(getCategoryById).toBeCalledTimes(1);
        expect(result).toHaveProperty('_id', exampleCategory._id);
        expect(result).toHaveProperty('title', exampleCategory.title);
        expect(result).toHaveProperty('description', exampleCategory.description);
        expect(result).toHaveProperty('icon', exampleCategory.icon);
        expect(result).toHaveProperty('isActive', exampleCategory.isActive);
        expect(result).toHaveProperty('createdAt', exampleCategory.createdAt);
        expect(result).toHaveProperty('createdBy', exampleCategory.createdBy);
    });

    it('should call createCategory on the service', async () => {
        const exampleCategory: CategoryDto = {
            title: 'Category title 1',
            description: 'Category description 1',
            icon: '639330a5dd8ff66110de0106',
            isActive: true,
        }

        const createCategory = jest.spyOn(categoryService, 'createCategory')
            .mockImplementation(async () => { });

        const user = { 
            _id: "639330a5dd8ff66110de0102", 
            name: "Jane Doe", 
            age: 23, 
            emailAddress: "janedoe@gmail.com", 
            picture: "https://i.pinimg.com/564x/a6/58/32/a65832155622ac173337874f02b218fb--people-icon-avatar.jpg", 
            following: null, 
            role: "customer", 
            password: "$2b$10$J8o0ny8finO6pEQIgxr0Ne7QY6GAePuCwMSuSkDg2JuZo9IjlS4AK", 
            createdAt: "2022-12-09T12:57:09.489Z"
        };

        const result = await categoryController.createCategory(user, exampleCategory);

        expect(createCategory).toBeCalledTimes(1);
        expect(result.message).toEqual('Category has been succesfully created!');
        expect(result.status).toEqual(201);
    });

    it('should call updateCategory on the service', async () => {
        const exampleCategory: CategoryDto = {
            title: 'Category title 2',
            description: 'Category description 1',
            icon: '639330a5dd8ff66110de0106',
            isActive: true,
        }

        const updateCategory = jest.spyOn(categoryService, 'updateCategory')
            .mockImplementation(async () => { });
            
        const categoryId = '638fd0ec2a2c5f2af03d4c94';

        const user = { 
            _id: "639330a5dd8ff66110de0102", 
            name: "Jane Doe", 
            age: 23, 
            emailAddress: "janedoe@gmail.com", 
            picture: "https://i.pinimg.com/564x/a6/58/32/a65832155622ac173337874f02b218fb--people-icon-avatar.jpg", 
            following: null, 
            role: "customer", 
            password: "$2b$10$J8o0ny8finO6pEQIgxr0Ne7QY6GAePuCwMSuSkDg2JuZo9IjlS4AK", 
            createdAt: "2022-12-09T12:57:09.489Z"
        };

        const result = await categoryController.updateCategory(user, categoryId, exampleCategory);

        expect(updateCategory).toBeCalledTimes(1);
        expect(result.message).toEqual('Category has been succesfully updated!');
        expect(result.status).toEqual(200);
    });

    it('should call deleteCategory on the service', async () => {
        const deleteCategory = jest.spyOn(categoryService, 'deleteCategory')
            .mockImplementation(async () => { });
            
        const categoryId = '638fd0ec2a2c5f2af03d4c94';

        const user = { 
            _id: "639330a5dd8ff66110de0102", 
            name: "Jane Doe", 
            age: 23, 
            emailAddress: "janedoe@gmail.com", 
            picture: "https://i.pinimg.com/564x/a6/58/32/a65832155622ac173337874f02b218fb--people-icon-avatar.jpg", 
            following: null, 
            role: "customer", 
            password: "$2b$10$J8o0ny8finO6pEQIgxr0Ne7QY6GAePuCwMSuSkDg2JuZo9IjlS4AK", 
            createdAt: "2022-12-09T12:57:09.489Z"
        };

        const result = await categoryController.deleteCategory(user, categoryId);

        expect(deleteCategory).toBeCalledTimes(1);
        expect(result.message).toEqual('Category has been succesfully deleted!');
        expect(result.status).toEqual(200);
    });
});