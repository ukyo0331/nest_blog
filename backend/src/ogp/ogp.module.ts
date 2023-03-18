import { Module, CacheModule } from '@nestjs/common';
import { OgpController } from './ogp.controller';
import { OgpService } from './ogp.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, CacheModule.register()],
  controllers: [OgpController],
  providers: [OgpService],
})
export class OgpModule {}
