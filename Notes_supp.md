### Biblioteca class-transfromer e class-validator (importante para definir rotas e hiperlinks)

## 1. Validação de Dados de Entrada:

Cenário: Imagine que você recebe dados de um usuário através de uma requisição HTTP POST para criar um novo usuário.
Problema: Sem validação, dados incorretos ou incompletos podem gerar erros e comprometer a integridade do seu sistema.
Solução: O class-validator entra em ação!
Crie uma classe de validação (por exemplo, CreateUserDto) que represente a estrutura dos dados do usuário.
Utilize decorators como @IsNotEmpty(), @IsEmail(), @MinLength(5), etc., para definir regras de validação para cada propriedade da classe.
Aplique a classe de validação ao parâmetro do método do controlador que recebe os dados do usuário.
Benefícios:
Dados confiáveis: Garante que apenas dados válidos e consistentes sejam processados.
Menos erros: Reduz a ocorrência de erros inesperados causados por dados incorretos.
Código mais robusto: Torna seu código mais confiável e resiliente.

Exemplo:

```TypeScript
// Classe de validação para um usuário
@Injectable()
export class CreateUserDto implements Serializable {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;
}

// Controlador que recebe os dados do usuário
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    // ... (Validação adicional e lógica de criação do usuário)
  }
}
```
Use o código com cuidado.


## 2. Serialização e Desserialização de Dados:

Cenário: Você precisa enviar dados do servidor para o cliente em formato JSON ou vice-versa.
Problema: A conversão manual de objetos em JSON e vice-versa pode ser complexa e propensa a erros.
Solução: O class-transformer facilita essa tarefa!
Utilize decorators como @Expose(), @Transform(), etc., para controlar quais propriedades de suas classes serão serializadas/desserializadas e como serão formatadas.
Crie métodos de transformação personalizados para converter dados de formatos específicos.
Benefícios:
Simplificação: Elimina a necessidade de conversão manual de dados, tornando o código mais conciso e legível.
Flexibilidade: Permite controlar a serialização/desserialização de forma granular, adaptando-se às suas necessidades.
Dados consistentes: Garante que os dados sejam convertidos de forma precisa e consistente.

Exemplo:

```TypeScript
// Classe de usuário com transformação personalizada
@Injectable()
export class User {
  id: number;
  name: string;
  email: string;

  // Transforma a data de nascimento para o formato dd/MM/yyyy
  @Transform((value) => new Date(value).toLocaleDateString('pt-BR'))
  @Expose()
  birthDate: Date;
}

// Controlador que retorna uma lista de usuários
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.findAll();
    return users.map((user) => new User(user)); // Transforma cada usuário para o formato desejado
  }
}
```
Use o código com cuidado.

## **Observações:**



O class-validator e o class-transformer trabalham em conjunto para garantir dados válidos e bem formatados em suas rotas Nest.js.
As bibliotecas oferecem diversas funcionalidades e opções de personalização que podem ser exploradas de acordo com as necessidades específicas do seu projeto.


# 2

```ts
  @Get('/app')
  async getHello(): Promise<string> {
    return this.appService.getHello();
  };
```

O tipo "Promise<string>" é fruto de usar um async na função, pois caso não haja o async da função getHello(), o trecho seria:

```ts
  @Get('/app')
  getHello(): string {
    return this.appService.getHello();
  };
```