export interface IUser {
    _id: string;
    name: string;
    emailAddress: string;
    picture: string;
    // follows: User[];
    role: string;
    password: string;
    isActive: boolean;
    createdAt: Date;
}

export class User implements IUser {
    _id: string = '';
    name: string = '';
    emailAddress: string = '';
    picture: string = '';
    // follows: User[] = new User[];
    role: string = '';
    password: string = '';
    isActive: boolean = false;
    createdAt: Date = new Date;
}