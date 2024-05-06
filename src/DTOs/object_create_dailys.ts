import { IsNotEmpty } from 'class-validator';

export class DailyCreate{

    @IsNotEmpty({message: 'Diário deve ter algum conteúdo '})
    content: string;

    @IsNotEmpty({message: 'Qual usuário está neste daily?'})
    userId: number
};