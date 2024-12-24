# NestJs RabbitMQ
## Name
RabbitMQ NestJs

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Author
```text
    Name: TaiLT
    Email: tientai***@gmail.com
```
## Installation
***Yarn***
```bash
  yarn add tailt-rabbitmq
```

***NPM***
```bash
  npm install tailt-rabbitmq --save
```

## Usage
***Producer***
```typescript
import { Module } from '@nestjs/common';
import { RabbitMqModule } from 'tailt-rabbitmq'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        RabbitMqModule.register({ name: MESSAGE_SERVICE }),
    ],
    controllers: [],
    providers: [ProducerService],
    exports: [ProducerService],
})
export class ProducerModule {}
```
***Consumer***
In main.ts file
import { RabbitMqService } from 'tailt-rabbitmq'

```typescript
async function bootstrap() {
    const app = await NestFactory.create(ConsumerModule);
    const rmqService = app.get<RabbitMqService>(RabbitMqService);
    app.connectMicroservice(rmqService.getOptions(MESSAGE_SERVICE));
    await app.startAllMicroservices();
}
bootstrap();
```
Options:
```typescript
interface RabbitMqModuleOptions {
  user?: string,    //Default guest
  passwd?: string,  //Default guest
  host?: string,    //Default localhost
  port?: number     //Default 5672
}
```
## Support
 <li>NestJs</li>
 <li>RabbitMQ</li>

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## License
For open source projects, say how it is licensed.
