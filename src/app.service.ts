import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { Repository } from "typeorm";
import { UserEntity } from './user/user.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRedis() private readonly redis: Redis,
    @InjectRepository(UserEntity) private userDevicesRepository: Repository<UserEntity>,
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  async healthCheck(): Promise<any> {
    await this.redis.set('test_key', 'success');
    const value =  await this.redis.get('test_key');
    const count = await this.userDevicesRepository.count();
    return {
      'mysql': count == 0 ? 'success': 'fail',
      'redis': value ? 'success': 'fail'
    }
    
  }
}
