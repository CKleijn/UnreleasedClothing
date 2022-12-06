import { User } from "../user/user.model";
import { Category } from "../category/category.model";

export class Product {
    _id: string = '';
    name: string = '';
    picture: string = '';
    price: number = 0.00;
    description: string = '';
    category: Category = <Category>{};
    createdBy: User = <User>{};
    createdAt: Date = <Date>{};
}