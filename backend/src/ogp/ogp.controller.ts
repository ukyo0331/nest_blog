import { Body, Controller, Post } from '@nestjs/common';
import { OgpService } from './ogp.service';
import { OgpDto } from './dto/ogp.dto';

@Controller('ogp')
export class OgpController {
  constructor(private readonly ogpService: OgpService) {}

  @Post()
  getOgpData(@Body() dto: OgpDto): Promise<any> {
    return this.ogpService.getOgpData(dto.url);
  }
}
