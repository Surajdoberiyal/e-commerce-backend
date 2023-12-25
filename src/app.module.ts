import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongodbModule } from './mongodb.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, MongodbModule, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
