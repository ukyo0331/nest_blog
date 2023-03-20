import { Injectable } from '@nestjs/common';
import { OgpMetaData } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

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
  constructor(private readonly prisma: PrismaService) {}
  private ogpRequestLocks: Map<
    string,
    Promise<Omit<OgpMetaData, 'id' | 'postId'>>
  > = new Map();
  async getOgpData(url: string): Promise<Omit<OgpMetaData, 'id' | 'postId'>> {
    const response = await axios.get(
      `https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=${
        process.env.OGP_API_KEY
      }`,
    );
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

    // Check if the data already exists in the database
    const existingMeta = await this.checkOgpExistenceByUrl(
      decodeURIComponent(encodedUrl),
    );
    if (existingMeta) {
      return existingMeta;
    }

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
        encodedUrl: url,
      },
    });
    return meta;
  }

  //OGPがデータベースに存在しない場合、OGPを取得してデータベースに格納する
  async getOrCreateOgpData(
    url: string,
    postId: string,
  ): Promise<Omit<OgpMetaData, 'id' | 'postId'>> {
    const encodedUrl = encodeURIComponent(url);
    const meta = await this.checkOgpExistenceByUrl(encodedUrl);
    if (meta) {
      return meta;
    }
    let ongoingRequest = this.ogpRequestLocks.get(encodedUrl);
    if (!ongoingRequest) {
      ongoingRequest = this.getOgpData(url).then((createdMeta) => {
        this.setOgpData(createdMeta, postId);
        this.ogpRequestLocks.delete(encodedUrl);
        return createdMeta;
      });
      this.ogpRequestLocks.set(encodedUrl, ongoingRequest);
    }

    return ongoingRequest;
  }
  //OGPの内容を更新
  async updateOgp(url: string, postId: string): Promise<any> {
    const meta = await this.getOgpData(url);
    await this.setOgpData(meta, postId);
    return meta;
  }
}
