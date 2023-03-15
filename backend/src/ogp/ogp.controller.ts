import { Body, Controller, Post } from '@nestjs/common';
import { OgpService } from './ogp.service';
import { CreateOgpDto, GetOgpDto } from './dto/ogp.dto';
import { OgpMetaData } from '@prisma/client';

@Controller('ogp')
export class OgpController {
  constructor(private readonly ogpService: OgpService) {}

  @Post()
  getOgpData(@Body() dto: GetOgpDto): Promise<Omit<OgpMetaData, 'postId'>> {
    return this.ogpService.getOgpData(dto.url);
  }

  @Post()
  getOrCreateOgpData(@Body() dto: CreateOgpDto) {
    return this.ogpService.getOrCreateOgpData(dto.url, dto.postId);
  }
}
