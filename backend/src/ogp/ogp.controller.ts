import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OgpService } from './ogp.service';
import { CreateOgpDto, GetOgpDto } from './dto/ogp.dto';
import { OgpMetaData } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('ogp')
export class OgpController {
  constructor(private readonly ogpService: OgpService) {}
  @Post()
  getOgpData(@Body() dto: GetOgpDto): Promise<Omit<OgpMetaData, 'id' | 'postId'>> {
    return this.ogpService.getOgpData(dto.url);
  }

  // @Post()
  // getOrCreateOgpData(
  //   @Body() dto: CreateOgpDto,
  // ): Promise<Omit<OgpMetaData, 'id' | 'postId'>> {
  //   return this.ogpService.getOrCreateOgpData(dto.url, dto.postId);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  updateOgp(@Body() dto: CreateOgpDto): Promise<OgpMetaData> {
    return this.ogpService.updateOgp(dto.url, dto.postId);
  }

  // @Delete()
  // deleteOgp(@Body() url: string) {
  //   return this.ogpService.deleteOgp(url);
  // }
}
