import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Controller('data')
export class DataController {
  constructor(
    private prismaService: PrismaService
    ){}

  @Get(':id')
  async get_data(@Param('id') id: number) {

    try{
        const user = await this.prismaService.user.findUnique({where:{id:+id}})
        if(!user) {
          return {menssage: 'Usuário não encontrado'};
        };

        const daily = await this.prismaService.daily.findMany({where:{userId: +id}})
        return {user, daily}
      }
      catch(err){
        console.log(err);
        return err
      };
    };  
};