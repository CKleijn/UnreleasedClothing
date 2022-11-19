import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    products: Product[] = [
        {
            _id: 1,
            name: 'T-shirt with logo embroidery',
            picture: 'https://cdn-1.debijenkorf.nl/web_detail_2x/daily-paper-alias-t-shirt-met-logoborduring/?reference=039/040/0390408002985002_pro_mod_frt_01_1108_1528_7156711.jpg',
            price: 49.99,
            description: 'This is one of our newest products that we plan to launch soon. Before we do this, we would like to ask for your opinion in order to make any adjustments.',
            brand: 'Daily Paper',
            isActive: true
        },
        {
            _id: 2,
            name: 'T-shirt with logo print',
            picture: 'https://cdn-1.debijenkorf.nl/web_detail_2x/diesel-t-wash-t-shirt-met-logoprint/?reference=068/970/0689703513300000_pro_mod_frt_01_1108_1528_7102611.jpg',
            price: 79.99,
            description: 'This is one of our newest products that we plan to launch soon. Before we do this, we would like to ask for your opinion in order to make any adjustments.',
            brand: 'Diesel',
            isActive: false
        },
        {
            _id: 3,
            name: 'T-shirt with logo print',
            picture: 'https://cdn-1.debijenkorf.nl/web_detail_2x/balr-t-shirt-van-biologisch-katoen-met-logoprint/?reference=035/480/0354809000567002_pro_mod_frt_01_1108_1528_5550214.jpg',
            price: 74.99,
            description: 'This is one of our newest products that we plan to launch soon. Before we do this, we would like to ask for your opinion in order to make any adjustments.',
            brand: 'Balr',
            isActive: true
        },
        {
            _id: 4,
            name: 'T-shirt with logo- and back print',
            picture: 'https://cdn-1.debijenkorf.nl/web_detail_2x/calvin-klein-t-shirt-met-flock-logo-en-backprint/?reference=074/750/0747508000212002_pro_mod_frt_01_1108_1528_7315597.jpg',
            price: 24.99,
            description: 'This is one of our newest products that we plan to launch soon. Before we do this, we would like to ask for your opinion in order to make any adjustments.',
            brand: 'Calvin Klein',
            isActive: true
        },
        {
            _id: 5,
            name: 'T-shirt with logo- and back print',
            picture: 'https://cdn-1.debijenkorf.nl/web_detail_2x/in-gold-we-trust-the-pusha-t-shirt-van-biologisch-katoen-met-logo-en-backprint/?reference=050/980/0509808001351003_pro_mod_frt_01_1108_1528_7516704.jpg',
            price: 69.99,
            description: 'This is one of our newest products that we plan to launch soon. Before we do this, we would like to ask for your opinion in order to make any adjustments.',
            brand: 'In Gold We Trust',
            isActive: false
        },
    ];

    constructor() { }

    getProducts(): Product[] {
        return this.products;
    }

    getProductById(productId: number): Product {
        return this.products.filter(product => product._id === productId)[0];
    }

    getNewIndex(): number {
        let lastIndex = this.products[this.products.length - 1]._id;
        return lastIndex + 1;
    }

    createProduct(product: Product) {
        this.products.push(product);
    }

    updateProduct(productId: number, newProduct: Product) {
        const productIndex = this.products.findIndex(product => product._id === productId)
        this.products[productIndex] = newProduct;
    }

    deleteProduct(productId: number) {
        this.products = this.products.filter(product => product._id !== productId);
    }
}
