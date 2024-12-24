import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitMqService {
  private readonly logger = new Logger(RabbitMqService.name);

  constructor(private readonly configService: ConfigService) {}

  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [
          {
            protocol: this.configService.get<boolean>('RABBITMQ_USE_SSL')
              ? 'amqps'
              : 'amqp',
            hostname: this.configService.get<string>('RABBITMQ_HOST'),
            username: this.configService.get<string>('RABBITMQ_USERNAME'),
            password: this.configService.get<string>('RABBITMQ_PASSWORD'),
            vhost: this.configService.get<string>('RABBITMQ_VHOST'),
          },
        ],
        queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
        noAck,
        persistent: true,
      },
    };
  }

  ack(ctx: RmqContext) {
    this.logger.log('ack');
    const channel = ctx.getChannelRef();
    const originalMessage = ctx.getMessage();
    this.logger.debug(ctx.getPattern(), JSON.stringify(originalMessage));
    channel.ack(originalMessage);
  }
}
