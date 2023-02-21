import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class ImageService {
  private s3: S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3();
  }

  //ファイルをアップロード
  async uploadFile(dataBuffer: Buffer, filename: string) {
    const uploadResult = await this.s3
      .upload({
        Bucket: this.configService.get('aws.s3BucketName'),
        Body: dataBuffer,
        Key: `${filename}`,
      })
      .promise();

    console.log('Key:', uploadResult.Key);
    console.log('url:', uploadResult.Location);
  }

  // getPreSignedUrlForPut(filename: string) {
  //   const key = `category-icon/${filename}`;
  //   const params = {
  //     Bucket: this.configService.get('aws.s3BucketName'),
  //     Key: key,
  //     Expires: 60 * 5,
  //   };
  //
  //   const url = this.s3.getSignedUrl('putObject', params);
  //   return {
  //     key,
  //     preSignedUrl: url,
  //   };
  // }

  //s3から画像ファイルのSignedURLを取得
  async getPreSignedUrlForGet(key: string) {
    const params = {
      Bucket: this.configService.get('aws.s3BucketName'),
      Key: key,
      Expires: 60 * 5,
    };

    try {
      const url = this.s3.getSignedUrl('getObject', params);
      await this.checkUrl(url);
      return {
        key,
        preSignedUrl: url,
      };
    } catch (err) {
      //アイコンが存在しない場合はnoimage.pngのpreSignedURLを返す
      const url = this.s3.getSignedUrl('getObject', {
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

  //オブジェクト一覧を取得
  async getListObjects() {
    return this.s3
      .listObjects({
        Bucket: this.configService.get('aws.s3BucketName'),
      })
      .promise()
      .then((res) => {
        const resultArr = [];
        for (const data of res.Contents) {
          resultArr.push(data.Key);
        }
        return resultArr;
      });
  }
}
