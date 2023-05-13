import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { getMetadataArgsStorage } from "typeorm";

@Injectable()
export class AppService {

  constructor(@InjectRedis() private readonly redis: Redis) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  async healthCheck(): Promise<any> {
    await this.redis.set('test_key', 'success');
    const value =  await this.redis.get('test_key');
    console.log(value)
    const data = getMetadataArgsStorage().generations;
    return {
      'mysql': data ? 'success': 'fail',
      'redis': value ? 'success': 'fail'
    }
    
  }
}
