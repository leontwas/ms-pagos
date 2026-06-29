import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

let cachedExpressApp: any;

export default async function handler(req: any, res: any) {
  try {
    if (!cachedExpressApp) {
      const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn'],
      });
      app.enableCors({ origin: '*' });
      await app.init();
      cachedExpressApp = app.getHttpAdapter().getInstance();
    }
    cachedExpressApp(req, res);
  } catch (error) {
    console.error('Error bootstrapping NestJS:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
