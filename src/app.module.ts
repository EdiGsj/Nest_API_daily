import { Module } from '@nestjs/common';
import { UserController } from './Controllers/User/user.controller';
import { PrismaService } from './services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticatorService } from './services/authenticator.service';
import { DailyController } from './Controllers/Daily/daily.controller'
import { DataController } from './Controllers/Relations/datafull.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'Segredo', 
      signOptions: { expiresIn: '1h' },
    }),
  ],

  controllers: [UserController, DailyController, DataController],
  providers: [PrismaService, AuthenticatorService],
})

export class AppModule {}
