import { Injectable } from '@nestjs/common';
import { OgpMetaData } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OgpService {
  constructor(private readonly prisma: PrismaService) {}
  async getOgpData(url: string): Promise<Omit<OgpMetaData, 'postId'>> {
    const response = await fetch(
      `https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=${
        process.env.OGP_API_KEY
      }`,
    );
    // const response = await fetch(
    //   `https://api.linkpreview.net?key=${process.env.LINK_PREVIEW_API_KEY}&q=${url}`,
    // );
    const data = response.json();
    return data;
  }
  //取得したOGPをDBに格納
  async setOgpData(
    postId: string,
    data: Omit<OgpMetaData, 'postId'>,
  ): Promise<OgpMetaData> {
    const { title, image, description, encodedUrl, favicon } = data;
    const meta = await this.prisma.ogpMetaData.create({
      data: {
        title,
        postId,
        image,
        description,
        encodedUrl,
        favicon,
      },
    });
    return meta;
  }

  //urlからデータベースにOGPが格納されていないかチェック
  async checkOgpExistenceByUrl(encodedUrl: string): Promise<OgpMetaData> {
    const meta = await this.prisma.ogpMetaData.findFirst({
      where: {
        encodedUrl,
      },
    });
    return meta;
  }

  //OGPがデータベースに存在しない場合、OGPを取得してデータベースに格納する
  async getOrCreateOgpData(
    url: string,
    postId: string,
  ): Promise<Omit<OgpMetaData, 'postId'>> {
    const meta = await this.checkOgpExistenceByUrl(encodeURIComponent(url));
    if (!meta) {
      const createdMeta = await this.getOgpData(url);
      await this.setOgpData(postId, createdMeta);
      return createdMeta;
    }
    return meta;
  }
  //OGPの内容を更新
  async updateOgp(url: string, postId: string): Promise<any> {
    const meta = await this.getOgpData(url);
    await this.setOgpData(postId, meta);
    return meta;
  }
}
