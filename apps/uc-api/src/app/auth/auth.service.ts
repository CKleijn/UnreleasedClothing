import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from "../user/dtos/loginUser.dto";
import { User } from "../user/user.schema";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from "../user/dtos/registerUser.dto";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async login(loginUserDto: LoginUserDto): Promise<string> {
        return await this.jwtService.signAsync({ name: loginUserDto.username });
    }

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        const user = await this.userService.getUserByEmailAddress(registerUserDto.emailAddress);

        if(!user) {
            if(registerUserDto.password !== undefined) {
                registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10);
                return await this.userService.registerUser(registerUserDto);
            } else {
                throw new HttpException('Password is required!', HttpStatus.CONFLICT)
            }
        } else {
            throw new HttpException('This user already exists!', HttpStatus.CONFLICT)
        }
    }

    async validate(emailAddress: string, password: string): Promise<User> {
        const user = await this.userService.getUserByEmailAddress(emailAddress);

        if(user) {
            const passwordValid = await bcrypt.compare(password, user.password.toString());

            if (user && passwordValid)
                return user;
        }

        return null;
    }
}