export interface ICategory {
    _id: string;
    title: string;
    description: string;
    icon: string;
    createdAt: Date;
}

export class Category implements ICategory {
    _id: string = '';
    title: string = '';
    description: string = '';
    icon: string = '';
    createdAt: Date = <Date>{};
}