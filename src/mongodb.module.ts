import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
      }),
    }),
  ],
})
export class MongodbModule {}
