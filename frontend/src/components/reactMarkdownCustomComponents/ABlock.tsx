import { FC, useEffect, useState } from 'react';
import { Node } from 'unist';
import axios from 'axios';
import Image from 'next/image';

export interface AProps {
  node?: Node;
  children?: React.ReactNode;
}

interface ElementNode extends Node {
  tagName: string;
  properties: {
    [key: string]: string;
  };
  children: Node[];
}
type MetaState = {
  title: string | null | undefined;
  description: string | null | undefined;
  favicon: string | null | undefined;
  image: string | null | undefined;
}

const ABlock: FC<AProps> = ({ node, children = '' }) => {
  const elementNode = node as ElementNode;
  const url = elementNode?.properties?.href;
  const [meta, setMeta] = useState<MetaState>({
    title: '仮タイトル', description: 'ロード中...', favicon: '/favicon.ico', image: ''
  });
  useEffect(() => {
    const fetchMeta = async (url: string) => {
      try {
        const data = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/ogp`,{
            url
          }
          );
        console.log(data);
        const { title, description, favicon, image } = data.data.hybridGraph;
        setMeta({
          title, image, favicon, description
        })
        // const response = await fetch(url);
        // const html = await response.text();
        // const parser = new DOMParser();
        // const doc = parser.parseFromString(html, 'text/html');
        // const titleMeta = doc.querySelector('meta[property="og:title"]');
        // const descMeta = doc.querySelector('meta[property="og:description"]');
        // const faviconUrl = doc.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
        // console.log(faviconUrl);
        // setMeta({
        //   title: titleMeta?.getAttribute('content'),
        //   description: descMeta?.getAttribute('content'),
        // });
      } catch (err) {
        setMeta({
          title: '',
          description: 'リンク先の情報の読み取りに失敗しました',
          favicon: '/favicon.ico',
          image: '',
        })
      }
    }
    url && fetchMeta(url );
  }, []);
  //div等は使えない様子なので代用としてspan要素にblockを付与してスタイリング
  return (
    <>
      <a href={`${elementNode?.properties?.href}`}>
        <span className='block border-2 h-32'>
          <span className='block flex '>
            <img src={`${meta.image}`} alt='リンク先のイメージ画像'/>
            <span>
              {meta?.title}
            </span>
          </span>
          <span className='block ml-8'>
            {meta.description}
          </span>
          <span>
            <img src={`${meta.favicon}`}/>
            {}
          </span>
        </span>
      </a>

    </>
  );
};

export default ABlock;
