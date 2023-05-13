import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';

const ENV_CONFIG = ConfigModule.forRoot();
const DB_CONFIG = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'test_development',
  synchronize: true,
  logging: process.env.NODE_ENV=='local' ? ["query"] : ["error"],
  timezone: '+00:00',
});

@Module({
  imports: [
    RedisModule.forRoot({
      config: { 
        url: process.env.REDIS_HOST,
      },
    }),
    ENV_CONFIG,
    DB_CONFIG,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
