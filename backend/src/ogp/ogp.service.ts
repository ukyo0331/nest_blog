import { Injectable } from '@nestjs/common';

@Injectable()
export class OgpService {
  async getOgpData(url: string): Promise<any> {
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
}
