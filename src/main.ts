import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import * as dotenv from 'dotenv';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

dotenv.config();

const server = express();

async function bootstrapServerless() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.getHttpAdapter().getInstance().set('etag', false);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({ origin: '*' });
  await app.init();
  return server;
}

async function bootstrapLocal() {
  const app = await NestFactory.create(AppModule);
  app.getHttpAdapter().getInstance().set('etag', false);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({ origin: '*' });
  const port = process.env.PORT ?? 3004;
  await app.listen(port, '0.0.0.0');
  console.log(`api-pagos corriendo localmente en puerto ${port}`);
}

let cachedServer: any;

export default async (req: any, res: any) => {
  try {
    if (!cachedServer) {
      cachedServer = await bootstrapServerless();
    }
    return cachedServer(req, res);
  } catch (error) {
    console.error('Error durante el arranque serverless:', error);
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Fallo al inicializar la aplicación en Vercel. Verificá la conexión a la base de datos y variables de entorno.',
      details: error.message || error,
    });
  }
};

if (process.env.NODE_ENV !== 'production') {
  bootstrapLocal();
}
