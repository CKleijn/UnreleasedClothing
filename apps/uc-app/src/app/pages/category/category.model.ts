export interface ICategory {
    _id: number;
    title: string;
    description: string;
    icon: string;
    createdAt: Date;
}

export class Category implements ICategory {
    _id: number = 0;
    title: string = '';
    description: string = '';
    icon: string = '';
    createdAt: Date = <Date>{};
}