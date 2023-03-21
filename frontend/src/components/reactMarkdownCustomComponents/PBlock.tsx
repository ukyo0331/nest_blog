import React, { FC } from 'react';
import { Node } from 'unist';

export interface PProps {
  node?: Node;
  children?: React.ReactNode;
}

const PBlock: FC<PProps> = ({ node, children = '' }) => {
  const childrenArray = React.Children.toArray(children)[0]?.toString().split('\n') || [];
  return (
    <>
      {childrenArray.map((_: string, index) => {
        return (
          <div key={index} className='ml-5'>
            <p>{_}</p>
          </div>
        )
      })}
    </>
  )
};

export default PBlock;
