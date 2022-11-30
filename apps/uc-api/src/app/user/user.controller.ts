import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "../auth/auth.service";
import { Role } from "../auth/roles/role.enum";
import { Roles } from "../auth/roles/roles.decorator";
import { LoginUserDto } from "./dtos/loginUser.dto";
import { RegisterUserDto } from "./dtos/registerUser.dto";
import { User } from "./user.schema";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private authService: AuthService, private userService: UserService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<Object> {
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
    async register(@Body() registerUserDto: RegisterUserDto): Promise<Object> {
        try {
            await this.authService.register(registerUserDto);

            return {
                status: 201,
                message: 'User has been successfully registered!'
            }
        } catch (error) {
            console.log(error)
            this.generateUserExceptions(error);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async getProfile(@Request() req: any): Promise<User> {
        return await this.userService.getUserByEmailAddress(req.user.emailAddress);
    }

    @Get(':userId')
    async getUser(@Param('userId') userId: string): Promise<User> {
        try {
            return await this.userService.getUserById(userId);
        } catch (error) {
            this.generateUserExceptions(error);
        }
    }

    generateUserExceptions(error: any) {
        if(error?.name === 'CastError')
            throw new HttpException(`This user doesn't exists!`, HttpStatus.NOT_FOUND)

        if(error?.response === 'This user already exists!')
            throw new HttpException(`This user already exists!`, HttpStatus.CONFLICT)

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