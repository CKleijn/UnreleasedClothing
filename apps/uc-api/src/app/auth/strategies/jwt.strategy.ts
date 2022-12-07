import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { environment } from 'apps/uc-api/src/environments/environment';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(UserService) private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.SECRET_KEY,
    });
  }

  async validate(loginUser: any) {
    const user = await this.userService.getUserByEmailAddress(loginUser.name);

    return { 
      _id: user._id, 
      name: user.name,
      emailAddress: user.emailAddress, 
      role: user.role 
    };
  }
}