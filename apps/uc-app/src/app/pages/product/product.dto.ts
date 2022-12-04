import { Category } from "../category/category.model";

export class ProductDto {
    name: string = '';
    picture: string = '';
    price: number = 0;
    description: string = '';
    category: Category = <Category>{};
}