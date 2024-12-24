import { config } from 'dotenv';
import { registerAs } from '@nestjs/config';

config();

export const connectionConfig = registerAs('connection', () => ({
  heartbeat: process.env.RABBITMQ_HEARTBEAT || 60,
  connectionTimeout: process.env.RABBITMQ_CONNECTION_TIMEOUT || 10000,
  connectionRetryLimit: process.env.RABBITMQ_CONNECTION_RETRY_LIMIT || 10,
  connectionName:
    process.env.RABBITMQ_CONNECTION_NAME ||
    `my_connection.${process.env.NODE_ENV || 'development'}`,
}));
