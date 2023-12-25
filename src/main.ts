import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as dotenvConfig } from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenvConfig();

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('E-commerce')
    .setDescription('Full stack configuration')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
