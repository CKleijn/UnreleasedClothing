import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    products: Product[] = [
        {
            _id: 1,
            name: 'T-shirt met logoborduring',
            picture: 'https://cdn-1.debijenkorf.nl/web_detail_2x/daily-paper-alias-t-shirt-met-logoborduring/?reference=039/040/0390408002985002_pro_mod_frt_01_1108_1528_7156711.jpg',
            price: 49.99,
            description: 'Dit is één van onze nieuwste producten die wij binnenkort willen lanceren. Voordat we dit doen vragen we graag om jullie mening om eventueel aanpassingen aan te brengen.',
            brand: 'Daily Paper'
        },
        {
            _id: 2,
            name: 'T-shirt met logoprint',
            picture: 'https://cdn-1.debijenkorf.nl/web_detail_2x/diesel-t-wash-t-shirt-met-logoprint/?reference=068/970/0689703513300000_pro_mod_frt_01_1108_1528_7102611.jpg',
            price: 79.99,
            description: 'Dit is één van onze nieuwste producten die wij binnenkort willen lanceren. Voordat we dit doen vragen we graag om jullie mening om eventueel aanpassingen aan te brengen.',
            brand: 'Diesel'
        },
        {
            _id: 3,
            name: 'T-shirt met logoprint',
            picture: 'https://cdn-1.debijenkorf.nl/web_detail_2x/balr-t-shirt-van-biologisch-katoen-met-logoprint/?reference=035/480/0354809000567002_pro_mod_frt_01_1108_1528_5550214.jpg',
            price: 74.99,
            description: 'Dit is één van onze nieuwste producten die wij binnenkort willen lanceren. Voordat we dit doen vragen we graag om jullie mening om eventueel aanpassingen aan te brengen.',
            brand: 'Balr'
        },
        {
            _id: 4,
            name: 'T-shirt met logo- en backprint',
            picture: 'https://cdn-1.debijenkorf.nl/web_detail_2x/calvin-klein-t-shirt-met-flock-logo-en-backprint/?reference=074/750/0747508000212002_pro_mod_frt_01_1108_1528_7315597.jpg',
            price: 24.99,
            description: 'Dit is één van onze nieuwste producten die wij binnenkort willen lanceren. Voordat we dit doen vragen we graag om jullie mening om eventueel aanpassingen aan te brengen.',
            brand: 'Calvin Klein'
        },
        {
            _id: 5,
            name: 'T-shirt met logo- en backprint',
            picture: 'https://cdn-1.debijenkorf.nl/web_detail_2x/in-gold-we-trust-the-pusha-t-shirt-van-biologisch-katoen-met-logo-en-backprint/?reference=050/980/0509808001351003_pro_mod_frt_01_1108_1528_7516704.jpg',
            price: 69.99,
            description: 'Dit is één van onze nieuwste producten die wij binnenkort willen lanceren. Voordat we dit doen vragen we graag om jullie mening om eventueel aanpassingen aan te brengen.',
            brand: 'In Gold We Trust'
        },
    ];

    constructor() { }

    getProducts(): Observable<Product[]> {
        return of(this.products);
    }

    getProductById(productId: number): Observable<Product> {
        return of(this.products.filter(product => product._id === productId)[0]);
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
