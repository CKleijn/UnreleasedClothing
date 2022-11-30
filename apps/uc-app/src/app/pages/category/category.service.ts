import { Injectable } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Category } from './category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    categories: Category[] = [
        {
            _id: 1,
            title: 'T-shirts',
            description: 'This is a category for t-shirts.',
            icon: 'https://cdn-icons-png.flaticon.com/512/863/863684.png',
            createdAt: new Date()
        },
        {
            _id: 2,
            title: 'Pants',
            description: 'This is a category for pants.',
            icon: 'https://cdn-icons-png.flaticon.com/512/664/664466.png',
            createdAt: new Date()
        },
        {
            _id: 3,
            title: 'Jackets',
            description: 'This is a category for jackets.',
            icon: 'https://cdn-icons-png.flaticon.com/512/1926/1926409.png',
            createdAt: new Date()
        },
        {
            _id: 4,
            title: 'Socks',
            description: 'This is a category for socks.',
            icon: 'https://cdn-icons-png.flaticon.com/512/263/263806.png',
            createdAt: new Date()
        },
        {
            _id: 5,
            title: 'Shoes',
            description: 'This is a category for shoes.',
            icon: 'https://cdn-icons-png.flaticon.com/512/500/500225.png',
            createdAt: new Date()
        },
    ];

    constructor(private productService: ProductService) { }

    getCategories(): Category[] {
        return this.categories;
    }

    getCategoryById(categoryId: number): Category {
        return this.categories.filter(category => category._id === categoryId)[0];
    }

    getTotalUsedByCategoryId(categoryId: number): number {
        let products = this.productService.getProducts();
        return products.filter(product => product.category._id === categoryId).length;
    }

    getNewIndex(): number {
        let lastIndex = this.categories[this.categories.length - 1]._id;
        return lastIndex + 1;
    }

    createCategory(category: Category) {
        this.categories.push(category);
    }

    updateCategory(categoryId: number, newCategory: Category) {
        const categoryIndex = this.categories.findIndex(category => category._id === categoryId)
        this.categories[categoryIndex] = newCategory;
    }

    deleteCategory(categoryId: number) {
        this.categories = this.categories.filter(category => category._id !== categoryId);
    }
}
