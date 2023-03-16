import { Injectable } from '@nestjs/common';
import { OgpMetaData } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OgpService {
  constructor(private readonly prisma: PrismaService) {}
  async getOgpData(url: string): Promise<Omit<OgpMetaData, 'id'>> {
    const response = await fetch(
      `https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=${
        process.env.OGP_API_KEY
      }`,
    );
    const data = await response.json();
    const { hybridGraph } = data;
    const { title, image, description, favicon } = hybridGraph;
    const ogpMetaData: Omit<OgpMetaData, 'id'> = {
      title,
      image,
      description,
      encodedUrl: encodeURIComponent(url),
      favicon,
    };
    //dataの形式をsetOgpDataに渡せる形に整形する！
    return ogpMetaData;
  }
  //取得したOGPをDBに格納
  async setOgpData(data: Omit<OgpMetaData, 'id'>): Promise<OgpMetaData> {
    const { title, image, description, encodedUrl, favicon } = data;
    const meta = await this.prisma.ogpMetaData.create({
      data: {
        title,
        image,
        description,
        encodedUrl,
        favicon,
      },
    });
    return meta;
  }

  //urlからデータベースにOGPが格納されていないかチェック
  async checkOgpExistenceByUrl(url: string): Promise<OgpMetaData> {
    const meta = await this.prisma.ogpMetaData.findFirst({
      where: {
        encodedUrl: url,
      },
    });
    return meta;
  }

  //OGPがデータベースに存在しない場合、OGPを取得してデータベースに格納する
  async getOrCreateOgpData(url: string): Promise<Omit<OgpMetaData, 'id'>> {
    const meta = await this.checkOgpExistenceByUrl(encodeURIComponent(url));
    if (!meta) {
      const createdMeta = await this.getOgpData(url);
      await this.setOgpData(createdMeta);
      return createdMeta;
    }
    return meta;
  }
  //OGPの内容を更新
  async updateOgp(url: string): Promise<any> {
    const meta = await this.getOgpData(url);
    await this.setOgpData(meta);
    return meta;
  }
}
