import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SSM } from 'aws-sdk';

// const ssm = new SSM();
// async function getParameter(name: string) {
//   const params = {
//     Name: name,
//   };
//   const data = await ssm.getParameter(params).promise();
//   return data.Parameter.Value;
// }
// async function getParameterFromSSM() {
//   const parameter = await getParameter('database_id');
//   process.env.DATABASE_URL = parameter.toString();
// }
// getParameterFromSSM();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
