export class RegisterUserDto {
    name: string;
    emailAddress: string;
    picture: string;
    role: string;
    password: string;

    constructor(name: string, emailAddress: string, picture: string, role: string, password: string) {
        this.name = name;
        this.emailAddress = emailAddress;
        this.picture;
        this.role = role;
        this.password = password;
    }
}
