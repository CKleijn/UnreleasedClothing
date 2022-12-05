import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "../auth/auth.service";
import { Role } from "../auth/roles/role.enum";
import { Roles } from "../auth/roles/roles.decorator";
import { RolesGuard } from "../auth/roles/roles.guard";
import { LoginUserDto } from "./dtos/loginUser.dto";
import { RegisterUserDto } from "./dtos/registerUser.dto";
import { User } from "./user.schema";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private authService: AuthService, private userService: UserService) { }

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

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.CUSTOMER)
    @Post(':userId/follow')
    async followUser(@Param('userId') userId: string, @Body() emailAddress: Object): Promise<Object> {
        try {
            await this.userService.followUser(Object(emailAddress)['emailAddress'], userId);

            return {
                status: 200,
                message: 'User has been successfully followed!'
            }
        } catch (error) {
            this.generateUserExceptions(error);
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.CUSTOMER)
    @Post(':userId/unfollow')
    async unfollowUser(@Param('userId') userId: string, @Body() emailAddress: Object): Promise<Object> {
        try {
            await this.userService.unfollowUser(Object(emailAddress)['emailAddress'], userId);

            return {
                status: 200,
                message: 'User has been successfully unfollowed!'
            }
        } catch (error) {
            this.generateUserExceptions(error);
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.CUSTOMER)
    @Get(':userId/status')
    async checkFollowStatus(@Request() req: any, @Param('userId') userId: string): Promise<boolean> {
        try {
            return await this.userService.alreadyFollowingUser(req.user.emailAddress, userId);
        } catch (error) {
            this.generateUserExceptions(error);
        }
    }

    generateUserExceptions(error: any) {
        console.log(error)
        if (error?.name === 'CastError')
            throw new HttpException(`This user doesn't exists!`, HttpStatus.NOT_FOUND)

        if (error?.response === 'This user already exists!')
            throw new HttpException(`This user already exists!`, HttpStatus.CONFLICT)

        if (error?.response?.message === `You don't follow this customer!`)
            throw new HttpException(`You don't follow this customer!`, HttpStatus.CONFLICT)

        if (error?.response?.message === `You can only follow other customers!`)
            throw new HttpException(`You can only follow other customers!`, HttpStatus.BAD_REQUEST)

        if (error?.response?.message === `You already follow this customer!`)
            throw new HttpException(`You already follow this customer!`, HttpStatus.BAD_REQUEST)

        if (error?.errors?.name)
            throw new HttpException(error.errors.name.message, HttpStatus.CONFLICT);

        if (error?.errors?.emailAddress)
            throw new HttpException(error.errors.emailAddress.message, HttpStatus.CONFLICT);

        if (error?.errors?.picture)
            throw new HttpException(error.errors.picture.message, HttpStatus.CONFLICT);

        if (error?.errors?.role)
            throw new HttpException(error.errors.role.message, HttpStatus.CONFLICT);

        if (error?.errors?.password)
            throw new HttpException(error.errors.password.message, HttpStatus.CONFLICT);
    }
}