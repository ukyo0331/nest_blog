import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { response } from 'express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  async uploadFile(@Body() file: any) {
    return this.imageService.uploadFile({
      Key: file.name,
      ContentType: file.type,
      Body: file,
    });
  }
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(
  //   @Req() request: any,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   try {
  //     await this.imageService.uploadFile(file.buffer, file.originalname);
  //   } catch (err) {
  //     return response.status(500).json(`画像のアップロードに失敗しました`);
  //   }
  // }

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
