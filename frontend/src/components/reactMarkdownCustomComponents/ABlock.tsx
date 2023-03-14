import { FC, useEffect, useState } from 'react';
import { Node } from 'unist';
import axios from 'axios';

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
}

const ABlock: FC<AProps> = ({ node, children = '' }) => {
  const elementNode = node as ElementNode;
  const url = elementNode?.properties?.href;
  const [meta, setMeta] = useState<MetaState>({title: '', description: ''});
  useEffect(() => {
    const fetchMeta = async (url: string) => {
      try {
        const data = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/ogp`,{
            url
          }
          );
        console.log(data);

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
          description: '',
        })
      }
    }
    fetchMeta(url ?? '');
  }, []);
  const description = meta?.description ?? '';
  console.log(description);
  return (
    <>
      <a href={`${elementNode?.properties?.href}`}>
        <span>
          {meta?.title}
        </span>
      </a>
      {description}
    </>
  );
};

export default ABlock;
