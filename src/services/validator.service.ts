import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticatorService } from './authenticator.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticatorService: AuthenticatorService) {
    // const secret: string = 'segredo'
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secreto', //secret,
    });
  };

  async validate(payload : any, password: any) {
    const user = await this.authenticatorService.login(payload, password);
    const hashed_password: string = await bcrypt.hash(password, 10)
    const equal = await bcrypt.compare(password, hashed_password)

    if (!equal) { 
      return {menssage:'Senha incorreta'}
    };
    if (!user) {
      throw new UnauthorizedException();
    };
    return user;
  };
};