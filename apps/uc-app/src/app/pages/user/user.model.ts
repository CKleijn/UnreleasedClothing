export interface IUser {
    _id: string;
    name: string;
    emailAddress: string;
    picture: string;
    following: User[];
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
    following: User[] = <User[]>{};
    role: string = '';
    password: string = '';
    isActive: boolean = false;
    createdAt: Date = new Date;
}