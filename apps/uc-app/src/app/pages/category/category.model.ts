import { User } from "../user/user.model";

export class Category {
    _id: string = '';
    title: string = '';
    description: string = '';
    icon: string = '';
    isActive: boolean = true;
    createdAt: Date = <Date>{};
    createdBy: User = <User>{};
}