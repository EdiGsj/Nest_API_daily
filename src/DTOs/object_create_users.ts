import { Length, IsNotEmpty } from 'class-validator';

export class Create{

    @IsNotEmpty({message: 'Nome deve ser preenchido'})
    name: string;

    @IsNotEmpty({message: 'E-mail deve ser preenchido'})
    @Length(10, 100)
    email: string;
    
    @IsNotEmpty({message: 'Senha deve ser preenchido e deve conter pelo menos 9 dígitos'})
    @Length(9,100)
    password: string;
};