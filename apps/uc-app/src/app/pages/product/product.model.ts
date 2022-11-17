export interface IProduct {
    _id: number;
    name: string;
    picture: string;
    price: number;
    description: string;
    brand: string;
}

export class Product implements IProduct {
    _id: number = 0;
    name: string = '';
    picture: string = '';
    price: number = 0.00;
    description: string = '';
    brand: string = '';
}