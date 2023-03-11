import { FC } from 'react';
import { HeadingComponent } from 'react-markdown/lib/ast-to-react';

export type H1Props = {
  node?: any;
  children?: React.ReactNode;
}

const H1Block: FC<H1Props> = ({ node, children = '' }) => {
  return (
    <div>
      <div className='relative'>
        <span className='block bg-black w-8 h-8'></span>
        <span></span>
      </div>
      <h2 className='bg-amber-200' id={node.position?.start.line.toString()}>
        {children}
      </h2>
    </div>
  );
};

export default H1Block;
