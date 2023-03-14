import { FC, useEffect, useState } from 'react';
import { Node } from 'unist';
import axios from 'axios';
import { Helmet } from 'react-helmet';

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
        const data  = await fetch(`https://api.linkpreview.net?key=1bd3f88e5f7e7597b5cc51586c961f33&q=${url}`);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMeta(url ?? '');
  }, []);
  return (
    <div>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="shortcut icon" href={meta.favicon} />
      </Helmet>
      <h2>{meta.title}</h2>
      <p>{meta.description}</p>
      <img src={meta.image} alt={meta.title} />
    </div>
  );
};

export default ABlock;
