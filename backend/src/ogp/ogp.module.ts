import { Module } from '@nestjs/common';
import { OgpController } from './ogp.controller';
import { OgpService } from './ogp.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OgpController],
  providers: [OgpService],
})
export class OgpModule {}
