import { Controller, Post, Get, Put, Delete, Body, Param, Headers } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { Create } from '../../DTOs/object_create_users';
import { AuthenticatorService } from 'src/services/authenticator.service';
import * as bcrypt from 'bcrypt'

@Controller('user')
export class UserController {
  constructor(
    private prismaService: PrismaService, 
    private readonly authenticatorService: AuthenticatorService
    ) {}

  //CRIAR
  @Post('register') 
  async register_user(@Body() body: Create) {
    try{
      const {name, email, password} = body;
      const hashed_password: string = await bcrypt.hash(password, 10)
      const user = await this.prismaService.user.create({data: {name, email, password: hashed_password}})
      return {user};
    }
    catch(err){
      console.log(err);
      return err
    };
  };

  //Login
  @Post('login')
  async login_user(@Body() data: {email: string, password: string}) {
    const {password} = data
    const hashed_password: string = await bcrypt.hash(password, 10)
    // try{
      
    const equal = await bcrypt.compare(password, hashed_password)
    console.log(equal);
    
    if (!equal) { 
      return {menssage:'Senha incorreta'}
    };

    return await this.authenticatorService.login(data.email, data.password)
    //}
    // catch(err){
    //   return err
    // };
  };

  // @Get('token')
  // async token_test(@Headers('authorization') auth: string){
  //   const parts = auth.split(' ')
  //   if (parts.length !== 2 || parts[0] !== 'Bearer'){
  //     return{menssage: 'Invalid Authorization header format'}
  //   };
  //   const token = this.authenticatorService.user_id(parts[1])
  //    return token;
  // };

  //LER TODOS
  @Get('/') 
  async get_all() {
    try{
      return await this.prismaService.user.findMany()
    }
    catch(err){
      console.log(err);
      return err
    };
  };

  //LER ÚNICO (PELO ID)
  @Get(':id')
  async get_user(@Param('id') id: number) {
    try{
      const user = await this.prismaService.user.findUnique({where:{id:+id}})
      if(!user) {
        return {menssage: 'Usuário não encontrado'}
      }
      return {user}
    }
    catch(err){
      console.log(err);
      return err
    };
  };

  //ATUALIZAR (PELO ID)
  @Put(':id')
  async up_user(@Param('id') id: string, @Body() data: {name?: string, email?: string, password?: string}) {
    try{
      return await this.prismaService.user.update({where: {id:+id}, data})
    }
    catch(err){
      console.log(err);
      return err
    };
  };

  //DELETAR (PELO ID)
  @Delete(':id')
  async delete_user(@Param('id') id: string) {
    try{
      return await this.prismaService.user.delete({where:{id:+id}})
    }
    catch(err){
      console.log(err);
      return err
    };
  };

};
