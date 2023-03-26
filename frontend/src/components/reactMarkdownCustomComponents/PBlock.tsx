import React, { FC, ReactNode } from 'react';
import { Node } from 'unist';

export interface PProps {
  node?: Node;
  children?: React.ReactNode;
}

const PBlock: FC<PProps> = ({ node, children = '' }) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <>
      {childrenArray.map((element: ReactNode, index1) => {
        if (typeof element === 'string') {
          const textArray = element.split('\n');
          return (
            <React.Fragment key={index1}>
              {textArray.map((stringElement, index2) => {
                return (
                  <div className="ml-5" key={`${index1}-${index2}`}>
                    <p className='text-xl'>{stringElement}</p>
                  </div>
                );
              })}
            </React.Fragment>
          );
        }
        return <div key={index1}>{element}</div>;
      })}
    </>
  );
};

export default PBlock;
