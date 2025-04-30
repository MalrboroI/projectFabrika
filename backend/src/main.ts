import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express'; // Добавляем типы

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS с явным указанием методов
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Явная обработка OPTIONS запросов с правильной типизацией
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400');

    if (req.method === 'OPTIONS') {
      Logger.debug('Handling OPTIONS request', 'CORS');
      return res.status(204).end();
    }

    next();
  });

  await app.listen(3000);
  Logger.log('Server running on http://localhost:3000');
}

bootstrap().catch((err) => {
  Logger.error('Server failed to start', err);
  process.exit(1);
});
