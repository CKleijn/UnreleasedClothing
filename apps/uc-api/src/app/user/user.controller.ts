import { Body, Controller, Get, HttpException, HttpStatus, Post, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "../auth/auth.service";
import { Role } from "../auth/roles/role.enum";
import { Roles } from "../auth/roles/roles.decorator";
import { RolesGuard } from "../auth/roles/roles.guard";
import { LoginUserDto } from "./dtos/loginUser.dto";
import { RegisterUserDto } from "./dtos/registerUser.dto";

@Controller('user')
export class UserController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        try {
            const token = await this.authService.login(loginUserDto);

            return {
                'message': 'You are successfully logged in!',
                'jwt_token': token
            }
        } catch (error) {
            this.generateUserExceptions(error);
        }
    }

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        try {
            return await this.authService.register(registerUserDto);
        } catch (error) {
            this.generateUserExceptions(error);
        }
    }

    generateUserExceptions(error: any) {
        if(error?.response === `This user doesn't exists or your password is wrong!`)
            throw new UnauthorizedException(error.response);

        if(error?.response === 'This user already exists!')
            throw new HttpException(error.response, HttpStatus.CONFLICT);

        if(error?.response === 'Password is required!')
            throw new HttpException(error.response, HttpStatus.CONFLICT);

        if(error?.name === 'CastError')
            throw new HttpException('This ObjectId doesnt exists!', HttpStatus.NOT_FOUND)

        if(error?.errors?.name)
            throw new HttpException(error.errors.name.message, HttpStatus.CONFLICT);

        if(error?.errors?.emailAddress)
            throw new HttpException(error.errors.emailAddress.message, HttpStatus.CONFLICT);

        if(error?.errors?.picture)
            throw new HttpException(error.errors.picture.message, HttpStatus.CONFLICT);
        
        if(error?.errors?.role)
            throw new HttpException(error.errors.role.message, HttpStatus.CONFLICT);

        if(error?.errors?.password)
            throw new HttpException(error.errors.password.message, HttpStatus.CONFLICT);
    }
}