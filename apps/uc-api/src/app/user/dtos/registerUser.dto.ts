export class RegisterUserDto {
    name: string;
    age: number;
    emailAddress: string;
    picture: string;
    role: string;
    password: string;

    constructor(name: string, age: number, emailAddress: string, picture: string, role: string, password: string) {
        this.name = name;
        this.age = age;
        this.emailAddress = emailAddress;
        this.picture = picture;
        this.role = role;
        this.password = password;
    }
}
