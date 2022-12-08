import { AuthService } from '../../auth/auth.service';
import { CategoryService } from './category.service';
import { environment } from 'apps/uc-app/src/environments/environment';
import { Category } from './category.model';
import { of } from 'rxjs';
import { User } from '../user/user.model';
import { Icon } from '../../shared/icon/icon.model';
import { Product } from '../product/product.model';
import { CategoryDto } from './category.dto';

describe('CategoryService', () => {
    let categoryService: CategoryService;
    let authService: AuthService;
    let httpClientSpy: any;

    beforeEach(() => {
        httpClientSpy = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        }
        authService = new AuthService(httpClientSpy);
        categoryService = new CategoryService(httpClientSpy, authService);
    });

    it('Should create the service', () => {
        expect(categoryService).toBeTruthy();
    });

    it('Should return categories when calling categories', (done) => {
        const response: Category[] = [
            {
                _id: '6391333037ceb01d296c5982',
                title: 'Lorem1',
                description: 'Lorem ipsum1',
                icon: new Icon(),
                isActive: true,
                createdAt: new Date("2022-12-08T01:05:17.761Z"),
                createdBy: new User()
            },
            {
                _id: '6391333037ceb01d296c5236',
                title: 'Lorem2',
                description: 'Lorem ipsum2',
                icon: new Icon(),
                isActive: true,
                createdAt: new Date("2022-12-08T01:05:17.761Z"),
                createdBy: new User()
            }
        ];
        const url = environment.API_URL + 'categories';

        jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));
        categoryService.getCategories().subscribe({
            next: (data) => {
                expect(data.length).toBe(2)
                expect(data).toEqual(response);
                done();
            }
        });
        expect(httpClientSpy.get).toBeCalledTimes(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });

    it('Should return none categories when calling categories', (done) => {
        const response: Category[] = [];
        const url = environment.API_URL + 'categories';

        jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));
        categoryService.getCategories().subscribe({
            next: (data) => {
                expect(data.length).toBe(0)
                expect(data).toEqual(response);
                done();
            }
        });
        expect(httpClientSpy.get).toBeCalledTimes(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });

    it('Should return all categories when calling all categories', (done) => {
        const response: Category[] = [
            {
                _id: '6391333037ceb01d296c5982',
                title: 'Lorem1',
                description: 'Lorem ipsum1',
                icon: new Icon(),
                isActive: true,
                createdAt: new Date("2022-12-08T01:05:17.761Z"),
                createdBy: new User()
            },
            {
                _id: '6391333037ceb01d296c5236',
                title: 'Lorem2',
                description: 'Lorem ipsum2',
                icon: new Icon(),
                isActive: true,
                createdAt: new Date("2022-12-08T01:05:17.761Z"),
                createdBy: new User()
            }
        ];
        const url = environment.API_URL + 'categories/all';

        jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));
        categoryService.getAllCategories().subscribe({
            next: (data) => {
                expect(data.length).toBe(2)
                expect(data).toEqual(response);
                done();
            }
        });
        expect(httpClientSpy.get).toBeCalledTimes(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });

    it('Should return none categories when calling all categories', (done) => {
        const response: Category[] = [];
        const url = environment.API_URL + 'categories/all';

        jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));
        categoryService.getAllCategories().subscribe({
            next: (data) => {
                expect(data.length).toBe(0)
                expect(data).toEqual(response);
                done();
            }
        });
        expect(httpClientSpy.get).toBeCalledTimes(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });

    it('Should return icons when calling icons', (done) => {
        const response: Icon[] = [
            {
                _id: '6391333037ceb01d296c5982',
                title: 'Lorem1',
                icon: 'lorem ipsum link',
            },
            {
                _id: '6391333037ceb01d296c5236',
                title: 'Lorem2',
                icon: 'lorem ipsum link2',
            }
        ];
        const url = environment.API_URL + 'icons';

        jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));
        categoryService.getIcons().subscribe({
            next: (data) => {
                expect(data.length).toBe(2)
                expect(data).toEqual(response);
                done();
            }
        });
        expect(httpClientSpy.get).toBeCalledTimes(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });

    it('Should return none icons when calling icons', (done) => {
        const response: Icon[] = [];
        const url = environment.API_URL + 'icons';

        jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));
        categoryService.getIcons().subscribe({
            next: (data) => {
                expect(data.length).toBe(0)
                expect(data).toEqual(response);
                done();
            }
        });
        expect(httpClientSpy.get).toBeCalledTimes(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });

    it('Should return products when calling get products by category', (done) => {
        const response: Product[] = [
            {
                _id: '6391333037ceb01d296c5982',
                name: 'Lorem1',
                picture: 'lorem ipsum link1',
                price: 1700,
                description: 'lorem ipsum1',
                category: {
                    _id: '6391333037ceb01d296c5982',
                    title: 'Lorem1',
                    description: 'Lorem ipsum1',
                    icon: new Icon(),
                    isActive: true,
                    createdAt: new Date("2022-12-08T01:05:17.761Z"),
                    createdBy: new User()
                },
                createdBy: new User(),
                createdAt: new Date("2022-12-08T01:05:17.761Z"),
            },
            {
                _id: '6391333037ceb01d296c5236',
                name: 'Lorem2',
                picture: 'lorem ipsum link2',
                price: 124,
                description: 'lorem ipsum2',
                category: {
                    _id: '6391333037ceb01d296c5982',
                    title: 'Lorem1',
                    description: 'Lorem ipsum1',
                    icon: new Icon(),
                    isActive: true,
                    createdAt: new Date("2022-12-08T01:05:17.761Z"),
                    createdBy: new User()
                },
                createdBy: new User(),
                createdAt: new Date("2022-12-08T01:05:17.761Z"),
            }
        ];
        const url = environment.API_URL + 'products/category/6391333037ceb01d296c5982';

        jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));
        categoryService.getProductsByCategory('6391333037ceb01d296c5982').subscribe({
            next: (data) => {
                expect(data.length).toBe(2)
                expect(data).toEqual(response);
                done();
            }
        });
        expect(httpClientSpy.get).toBeCalledTimes(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });

    it('Should return none products when calling get products by category', (done) => {
        const response: Product[] = [];
        const url = environment.API_URL + 'products/category/6391333037ceb01d296c5982';

        jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));
        categoryService.getProductsByCategory('6391333037ceb01d296c5982').subscribe({
            next: (data) => {
                expect(data.length).toBe(0)
                expect(data).toEqual(response);
                done();
            }
        });
        expect(httpClientSpy.get).toBeCalledTimes(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });

    it('Should return category when calling get category by id', (done) => {
        const response: Category = {
            _id: '6391333037ceb01d296c5982',
            title: 'Lorem1',
            description: 'Lorem ipsum1',
            icon: new Icon(),
            isActive: true,
            createdAt: new Date("2022-12-08T01:05:17.761Z"),
            createdBy: new User()
        };
        const url = environment.API_URL + 'category/6391333037ceb01d296c5982';

        jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));
        categoryService.getCategoryById('6391333037ceb01d296c5982').subscribe({
            next: (data) => {
                expect(data._id).toEqual('6391333037ceb01d296c5982');
                expect(data).toEqual(response);
                done();
            }
        });
        expect(httpClientSpy.get).toBeCalledTimes(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });

    it('Should return no category when calling get category by id', (done) => {
        const response: Category = <Category>{};
        const url = environment.API_URL + 'category/6391333037ceb01d296c5982';

        jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));
        categoryService.getCategoryById('6391333037ceb01d296c5982').subscribe({
            next: (data) => {
                expect(data._id).toBeUndefined();
                expect(data).toEqual({});
                expect(data).toEqual(response);
                done();
            }
        });
        expect(httpClientSpy.get).toBeCalledTimes(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });

    it('Should return correct message when creating category', (done) => {
        const category: CategoryDto = {
            title: 'Lorem1',
            description: 'Lorem ipsum1',
            icon: new Icon(),
            isActive: true,
        };

        const response: Object = {
            status: 201,
            message: 'Category has been succesfully created!'
        };

        const url = environment.API_URL + 'category';

        jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(response));
        categoryService.createCategory(category).subscribe({
            next: (data) => {
                expect(data).toEqual(response);
                done();
            }
        });
        expect(httpClientSpy.post).toBeCalledTimes(1);
    });

    it('Should return error message when creating category', (done) => {
        const category: CategoryDto = {
            title: 'Lorem5',
            description: 'Lorem ipsum1',
            icon: new Icon(),
            isActive: true,
        };

        const response: Object = {
            message: 'This category title already exists!'
        };

        const url = environment.API_URL + 'category';

        jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(response));
        categoryService.createCategory(category).subscribe({
            next: (data) => {
                expect(data).toEqual(response);
                done();
            }
        });
        expect(httpClientSpy.post).toBeCalledTimes(1);
    });

    it('Should return correct message when updating category', (done) => {
        const category: CategoryDto = {
            title: 'Lorem2',
            description: 'Lorem ipsum2',
            icon: new Icon(),
            isActive: true,
        };

        const response: Object = {
            status: 200,
            message: 'Category has been succesfully updated!'
        };

        const url = environment.API_URL + 'category/6391333037ceb01d296c5982';

        jest.spyOn(httpClientSpy, 'put').mockReturnValue(of(response));
        categoryService.updateCategory('6391333037ceb01d296c5982', category).subscribe({
            next: (data) => {
                expect(data).toEqual(response);
                done();
            }
        });
        expect(httpClientSpy.put).toBeCalledTimes(1);
    });

    it('Should return error message when updating category', (done) => {
        const category: CategoryDto = {
            title: 'Lorem5',
            description: 'Lorem ipsum2',
            icon: new Icon(),
            isActive: true,
        };

        const response: Object = {
            message: 'This category title already exists!'
        };

        const url = environment.API_URL + 'category/6391333037ceb01d296c2352';

        jest.spyOn(httpClientSpy, 'put').mockReturnValue(of(response));
        categoryService.updateCategory('6391333037ceb01d296c2352', category).subscribe({
            next: (data) => {
                expect(data).toEqual(response);
                done();
            }
        });
        expect(httpClientSpy.put).toBeCalledTimes(1);
    });

    it('Should return correct message when deleting category', (done) => {
        const response: Object = {
            status: 200,
            message: 'Category has been succesfully deleted!'
        };

        const url = environment.API_URL + 'category/6391333037ceb01d296c5982';

        jest.spyOn(httpClientSpy, 'delete').mockReturnValue(of(response));
        categoryService.deleteCategory('6391333037ceb01d296c5982').subscribe({
            next: (data) => {
                expect(data).toEqual(response);
                done();
            }
        });
        expect(httpClientSpy.delete).toBeCalledTimes(1);
    });

    it('Should return error message when deleting category', (done) => {
        const response: Object = {
            message: `This category can't be deleted, because products are linked to this category!`
        };

        const url = environment.API_URL + 'category/6391333037ceb01d296c5982';

        jest.spyOn(httpClientSpy, 'delete').mockReturnValue(of(response));
        categoryService.deleteCategory('6391333037ceb01d296c2352').subscribe({
            next: (data) => {
                expect(data).toEqual(response);
                done();
            }
        });
        expect(httpClientSpy.delete).toBeCalledTimes(1);
    });
})


