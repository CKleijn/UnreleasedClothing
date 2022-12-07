import { Icon } from "../../shared/icon/icon.model";

export class CategoryDto {
    title: string = '';
    description: string = '';
    icon: Icon = <Icon>{};
    isActive: boolean = true;
}