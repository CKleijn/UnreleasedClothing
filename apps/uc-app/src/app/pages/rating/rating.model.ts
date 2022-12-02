export interface IRating {
    _id: string;
    title: string;
    picture: string;
    grade: number;
    description: string;
}

export class Rating implements IRating {
    _id: string = '';
    title: string = '';
    picture: string = '';
    grade: number = 0;
    description: string = '';
}