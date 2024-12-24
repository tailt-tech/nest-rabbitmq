import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { RabbitMqService } from "./rabbit-mq.service";

interface RMQModuleOptions {
  name: string;
}

@Module({
  providers: [ConfigService, RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitMqModule {
  static register({ name }: RMQModuleOptions): DynamicModule {
    return {
      module: RabbitMqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [
                  {
                    protocol: configService.get<boolean>('RABBITMQ_USE_SSL')
                      ? 'amqps'
                      : 'amqp',
                    hostname: configService.get<string>('RABBITMQ_HOST'),
                    username: configService.get<string>('RABBITMQ_USERNAME'),
                    password: configService.get<string>('RABBITMQ_PASSWORD'),
                    vhost: configService.get<string>('RABBITMQ_VHOST'),
                  },
                ],
                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
                queueOptions: {
                  durable: configService.get<boolean>('RABBITMQ_QUEUE_DURABLE'),
                },
                socketOptions: {
                  ssl: configService.get<boolean>('RABBITMQ_USE_SSL'),
                },
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
