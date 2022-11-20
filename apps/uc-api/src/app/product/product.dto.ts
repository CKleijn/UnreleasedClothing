import { IsNumber, IsString } from 'class-validator';

export class ProductDto {
    @IsString()
    name: string;

    @IsString()
    picture: string;

    @IsNumber()
    price: number;

    @IsString()
    description: string;
}
