import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { OgpMetaData } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';
import { Cache } from 'cache-manager';

interface HybridGraphData {
  title: string;
  image: string;
  description: string;
  favicon: string;
}

interface Data {
  hybridGraph?: HybridGraphData;
}

@Injectable()
export class OgpService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getOgpData(url: string): Promise<Omit<OgpMetaData, 'id' | 'postId'>> {
    const key = `ogp: ${url}`;
    let response: any = await this.cacheManager.get(key);
    if (!response) {
      response = await this.cacheManager.set(
        'ogp',
        await axios.get(
          `https://opengraph.io/api/1.1/site/${encodeURIComponent(
            url,
          )}?app_id=${process.env.OGP_API_KEY}`,
        ),
      );
    }
    const data: Data = await response.data;
    if (!data.hybridGraph) {
      throw new Error('Unexpected API response');
    }
    const { hybridGraph } = data;
    const { title, image, description, favicon } = hybridGraph;
    const ogpMetaData: Omit<OgpMetaData, 'id' | 'postId'> = {
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
  async setOgpData(
    data: Omit<OgpMetaData, 'id' | 'postId'>,
    postId: string,
  ): Promise<OgpMetaData> {
    const { title, image, description, encodedUrl, favicon } = data;
    try {
      const meta = await this.prisma.ogpMetaData.create({
        data: {
          title,
          image,
          description,
          encodedUrl,
          favicon,
          postId,
        },
      });
      return meta;
    } catch (err) {
      console.error(err);
      return;
    }
  }

  //urlからデータベースにOGPが格納されていないかチェック
  async checkOgpExistenceByUrl(url: string): Promise<OgpMetaData> {
    const encodedUrl = encodeURIComponent(url);
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
  ): Promise<Omit<OgpMetaData, 'id' | 'postId'>> {
    const meta = await this.checkOgpExistenceByUrl(url);
    if (!meta) {
      const createdMeta = await this.getOgpData(url);
      await this.setOgpData(createdMeta, postId);
      return createdMeta;
    }
    return meta;
  }

  //OGPの内容を更新
  async updateOgp(url: string, postId: string): Promise<any> {
    const meta = await this.getOgpData(url);
    await this.setOgpData(meta, postId);
    return meta;
  }

  // async deleteOgp(url: string) {
  //   await this.prisma.ogpMetaData.deleteMany({
  //     where: {
  //       encodedUrl: {
  //         equals: url,
  //       },
  //     },
  //   });
  // }
}
