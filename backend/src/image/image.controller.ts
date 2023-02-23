import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { success: false, error: '画像がありません' };
    }
    return await this.imageService.uploadImage(file);
  }

  // @Get('preSignedUrlForPut')
  // async getPreSignedUrlForPut(@Req() request: any) {
  //   return this.imageService.getPreSignedUrlForPut(request.query.filename);
  // }

  @Get('preSignedUrlForGet')
  async getPreSignedUrlForGet(@Req() request: any) {
    const key = request.query.key;
    return this.imageService.getPreSignedUrlForGet(key);
  }

  //オブジェクト一覧を取得
  @Get('getListObjects')
  async getListObject() {
    return this.imageService.getListObjects();
  }
}
