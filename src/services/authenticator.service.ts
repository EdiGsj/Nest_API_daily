import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/services/prisma.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthenticatorService{
    constructor(private readonly jwtService: JwtService, private prisma: PrismaService){};

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({where: {email:email}});

        if (!user) {
          throw new UnauthorizedException('Credencial inválida');
        };

        const hashed_password: string = await bcrypt.hash(password, 10)
        const equal = await bcrypt.compare(password, hashed_password)
        console.log(equal, "base");
        

        if (!equal) {
          throw new UnauthorizedException('Senha inválidas');
        };
    
        const payload = { userId: user.id };
        const token = this.jwtService.sign(payload);
    
         return { token }; // access_token: this.jwtService.sign(payload) 
    };

    async user_id(token : string) {
      try{
        const decodedToken = this.jwtService.decode(token);
        if (typeof decodedToken === 'object' && decodedToken.hasOwnProperty('userId')) {
          // return decodedToken['sub'];
          // const decodedToken = this.jwtService.decode(token);
          return  decodedToken.userId 
        }
        return 'token invalido'
      }
      catch(err){
        return err
      };
    };

};

