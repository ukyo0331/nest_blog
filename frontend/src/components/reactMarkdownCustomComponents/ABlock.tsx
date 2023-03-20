import { FC, useEffect, useState } from 'react';
import { Node } from 'unist';
import axios from 'axios';
import { useRouter } from 'next/router';

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
  const url = elementNode?.properties?.href as string;
  const [meta, setMeta] = useState<MetaState>({
    title: '', description: 'ロード中...', favicon: '', image: ''
  });
  const router = useRouter();
  const postId = router.query.postId;
  useEffect(() => {
    const fetchMeta = async (url: string) => {
      try {
        const data = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/ogp`,{
            url,
            postId,
          }
          );
        const { title, description, favicon, image } = data.data;
        setMeta({
          title, image, favicon, description
        })
      } catch (err) {
        setMeta({
          title: '',
          description: 'リンク先の情報の読み取りに失敗しました',
          favicon: '/favicon.ico',
          image: '',
        })
      }
    }
    url && fetchMeta(url);
  }, []);
  //div等は使えない様子なので代用としてspan要素にblockを付与してスタイリング
  return (
    <a href={`${elementNode?.properties?.href}`} className="flex items-center space-x-3 border-2 rounded">
      {meta.image ? (
        <img src={`${meta.image}`} alt='リンク先のイメージ画像' className="w-24 h-24 object-cover rounded-lg object-cover"/>
      ) : null}
      <span className="block flex-1 flex flex-col space-y-1 w-1">
        <span className="font-bold text-lg truncate pr-3">{meta?.title}</span>
        <span className="text-gray-500 text-sm truncate pr-3">{meta.description}</span>
        <span className="block flex items-center space-x-2 justify-end mr-3">
          {meta.favicon ? (
            <img src={`${meta.favicon}`} alt='Favicon' className="w-4 h-4"/>
          )
          : null}
          <span className="text-xs truncate">{(url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/) || [])[1] || ''}</span>
        </span>
      </span>
    </a>
  );

};

export default ABlock;
