import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get(process.env.AWS_ACCESS_KEY),
    secretAccessKey: configService.get(process.env.AWS_SECRET_KEY),
    region: configService.get(process.env.AWS_REGION),
  });
  app.disable('x-powered-by');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://my-blog-olive-ten.vercel.app'],
  });
  app.use(cookieParser());
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      },
      value: (req: Request) => {
        return req.header('csrf-token');
      },
    }),
  );
  await app.listen(process.env.PORT || 3005);
}
bootstrap();
