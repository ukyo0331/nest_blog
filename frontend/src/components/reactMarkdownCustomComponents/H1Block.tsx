import { FC } from 'react';
import { Node } from 'unist';

export type H1Props = {
  node?: Node;
  children?: React.ReactNode;
}

const H1Block: FC<H1Props> = ({ node, children = '' }) => {
  return (
    <div className='block shadow-xl p-0.5 mx-2 my-4'>
      <h2
        className='text-2xl m-2 pl-4 flex items-center font-bold border-l-[6px]'
        id={node?.position?.start.line.toString()}
      >
        {children}
      </h2>
    </div>
  );
};

export default H1Block;
