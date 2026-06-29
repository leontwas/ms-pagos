import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AllExceptionsFilter } from '../src/filters/all-exceptions.filter';

let cachedExpressApp: any;

export default async function handler(req: any, res: any) {
  try {
    if (!cachedExpressApp) {
      const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn'],
      });
      
      app.getHttpAdapter().getInstance().set('etag', false);
      app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
      );
      app.useGlobalFilters(new AllExceptionsFilter());
      app.enableCors({ origin: '*' });
      
      await app.init();
      cachedExpressApp = app.getHttpAdapter().getInstance();
    }
    
    return cachedExpressApp(req, res);
  } catch (error) {
    console.error('Error durante el arranque serverless en api/index.ts:', error);
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Fallo al inicializar la aplicación en Vercel. Verificá variables de entorno y base de datos.',
      details: error.message || error,
    });
  }
}
