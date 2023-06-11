import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(express.json({ limit: '50mb' }));
  app.enableCors({ origin: '*' });
  // app.use(
  //   session({
  //     secret: '1234', // Clave para cifrar la sesión
  //     resave: true, // Refresca la sesión en cada nuevo acceso
  //     saveUninitialized: false, // Guarda las sesiones aun sin haberse completad
  //     expires: new Date(Date.now() + 30 * 60 * 1000), // La sesión expirará en
  //   }),
  // );
  await app.listen(3000);
}
bootstrap();
