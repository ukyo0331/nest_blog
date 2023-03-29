import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

function readCsrfToken(req: Request) {
  return req.csrfToken();
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('aws.accessKey'),
    secretAccessKey: configService.get('aws.secretKey'),
    region: configService.get('aws.region'),
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
      value: readCsrfToken,
      // value: (req: Request) => {
      //   return req.header('csrf-token');
      // },
    }),
  );
  await app.listen(process.env.PORT || 3005);
}
bootstrap();
