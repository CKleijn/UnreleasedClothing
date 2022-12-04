import { User } from "../../auth/user.model";
import { Category } from "../category/category.model";

export interface IProduct {
    _id: string;
    name: string;
    picture: string;
    price: number;
    description: string;
    category: Category;
    isActive: boolean;
    createdBy: User;
    createdAt: Date;
}

export class Product implements IProduct {
    _id: string = '';
    name: string = '';
    picture: string = '';
    price: number = 0.00;
    description: string = '';
    category: Category = <Category>{};
    isActive: boolean = true;
    createdBy: User = <User>{};
    createdAt: Date = <Date>{};
}