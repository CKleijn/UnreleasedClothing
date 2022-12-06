export class User {
    _id: string = '';
    name: string = '';
    age: number = 0;
    emailAddress: string = '';
    picture: string = '';
    following: User[] = <User[]>{};
    role: string = '';
    password: string = '';
    createdAt: Date = new Date;
}