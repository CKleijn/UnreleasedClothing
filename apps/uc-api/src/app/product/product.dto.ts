export class ProductDto {
    name: string;
    picture: string;
    price: number;
    description: string;
    category: string;
    comments: [Comment];
}
