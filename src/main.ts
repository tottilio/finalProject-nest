import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Chihuahueños API')
    .setDescription('API para compra de boletos y administración de rutas')
    .setVersion('0.9')
    .addBearerAuth() 
    .build();
  
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory); // 👉 localhost:3000/api

  await app.listen(4000);
}
bootstrap();
