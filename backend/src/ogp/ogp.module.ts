import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { OgpController } from './ogp.controller';
import { OgpService } from './ogp.service';
import { PrismaModule } from '../prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [PrismaModule, CacheModule.register()],
  controllers: [OgpController],
  providers: [
    OgpService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class OgpModule {}
