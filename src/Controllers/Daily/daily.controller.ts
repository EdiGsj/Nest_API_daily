import { Controller, Post, Get, Put, Delete, Body, Param, Headers } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { DailyCreate } from 'src/DTOs/object_create_dailys';

@Controller('daily')
export class DailyController {
    constructor(
        private prismaService: PrismaService,
    ){}

    @Post('create')
    async create_daily(@Body() body: DailyCreate) {
        const {content, userId} = body;

        const user = await this.prismaService.user.findUnique({ where: { id: userId } });
        
        if (!user) {
          return {menssage: 'Usuário com ID '+ userId +' não encontrado'};
        }

        const daily = await this.prismaService.daily.create({data: {content, userId}});
        return {daily};
    };

    @Get(':id')
    async get_daily(@Param('id') id: number) {
        try{
            const daily = await this.prismaService.daily.findUnique({where:{id:+id}})
            if(!daily){
                return 'Diário não encontrado'
            };
            return {daily}
        }
        catch(err){   
            return err;
        };

    }

    @Get('') 
    async get_all_daily() {
        return await this.prismaService.daily.findMany()
    };
};