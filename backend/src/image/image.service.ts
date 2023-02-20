import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class ImageService {
  constructor(private readonly configService: ConfigService) {}

  getPreSignedUrlForPut(filename: string) {
    const s3 = new S3();
    const key = `category-icon/${filename}`;
    const params = {
      Bucket: this.configService.get('aws.s3BucketName'),
      Key: key,
      Expires: 60 * 5,
    };

    const url = s3.getSignedUrl('putObject', params);
    return {
      key,
      preSignedUrl: url,
    };
  }

  async getPreSignedUrlForGet(key: string) {
    const s3 = new S3();
    const params = {
      Bucket: this.configService.get('aws.s3BucketName'),
      Key: key,
      Expires: 60 * 5,
    };

    try {
      const url = s3.getSignedUrl('getObject', params);
      await this.checkUrl(url);
      return {
        key,
        preSignedUrl: url,
      };
    } catch (err) {
      //アイコンが存在しない場合はnoimage.pngのpreSignedURLを返す
      const url = s3.getSignedUrl('getObject', {
        Bucket: this.configService.get('aws.s3BucketName'),
        Key: 'noimage.png',
        Expires: 60 * 5,
      });
      return {
        key,
        preSignedUrl: url,
      };
    }
  }
  //URLがNOT FOUNDかどうか調べる = アイコンの存在チェック
  async checkUrl(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
  }
}
