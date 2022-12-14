import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform:true,
      whitelist: true, //quitara todos los atributos o datos que se envien que no esten definidos en el dto
      forbidNonWhitelisted: true, //mostrara el error
      transformOptions:{
        enableImplicitConversion:true
      }
    }),
  );
  //libreria swagger
  const config = new DocumentBuilder()
  .addBearerAuth()
    .setTitle('API NEST JS')
    .setDescription('Mi api de login')
    .setVersion('1.0')
    .addTag('prueba')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  app.use( //sesions
    session({
      name:'my sesion',
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie:{
        maxAge: 3000
      }
    }),
  );

  await app.listen(3000);
}
bootstrap();
