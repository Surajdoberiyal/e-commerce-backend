import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongodbModule } from './mongodb.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, MongodbModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
