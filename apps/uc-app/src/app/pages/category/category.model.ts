import { Icon } from "../../shared/icon/icon.model";
import { User } from "../user/user.model";

export class Category {
    _id: string = '';
    title: string = '';
    description: string = '';
    icon: Icon = <Icon>{};
    isActive: boolean = true;
    createdAt: Date = <Date>{};
    createdBy: User = <User>{};
}