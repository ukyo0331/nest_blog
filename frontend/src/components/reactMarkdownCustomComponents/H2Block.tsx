import { FC } from 'react';
import { Node } from 'unist';

export type H2Props = {
  node?: Node;
  children?: React.ReactNode;
}

const H2Block: FC<H2Props> = ({ node, children = '' }) => {
  return (
    <div className='block lg:max-w-[calc(1024px-16rem)] sm:max-w-[calc(768px-16rem)] w-screen'>
      <h3
        className='text-xl border-l-4 m-4 pl-4'
        id={node?.position?.start.line.toString()}
      >
        {children}
      </h3>
    </div>
  );
};

export default H2Block;
