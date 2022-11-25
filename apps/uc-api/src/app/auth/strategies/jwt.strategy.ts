import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'S1e2C3r4E5t',
    });
  }

  async validate(loginUser: any) {
    const user = await this.userService.getUserByEmailAddress(loginUser.name);

    return { 
      _id: user._id, 
      name: user.name, 
      role: user.role 
    };
  }
}