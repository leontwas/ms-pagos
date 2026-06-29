import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

let cachedExpressApp: any;

export default async function handler(req: any, res: any) {
  if (!cachedExpressApp) {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: '*' });
    await app.init();
    cachedExpressApp = app.getHttpAdapter().getInstance();
  }
  
  cachedExpressApp(req, res);
}
