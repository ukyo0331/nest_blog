import { Module } from '@nestjs/common';
import { OgpController } from './ogp.controller';
import { OgpService } from './ogp.service';

@Module({
  controllers: [OgpController],
  providers: [OgpService]
})
export class OgpModule {}
