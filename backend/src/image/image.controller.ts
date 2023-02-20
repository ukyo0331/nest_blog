import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('preSignedUrlForPut')
  async getPreSignedUrlForPut(@Req() request: any) {
    return this.imageService.getPreSignedUrlForPut(request.query.filename);
  }

  @Get('preSignedUrlForGet')
  async getPreSignedUrlForGet(@Req() request: any) {
    const key = request.query.key;
    return this.imageService.getPreSignedUrlForGet(key);
  }
}
