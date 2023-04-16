import React, { useEffect, useState } from 'react';
import TocItem from './TocItem';
import useTOC from '../hooks/toc/useTOC';

const Toc = () => {
  const { active, headingRef, handleTocItemClick } = useTOC();
  const [headings, setHeadings] = useState<Element[]>();
  useEffect(() => {
    setHeadings(headingRef as any);
  }, [headingRef]);
  return (
    <section className='toc-card overflow-y-scroll hidden-scrollbar'>
      <aside className='p-4'>
        <div className='flex gap-4 items-center'>
          <h2 className='text-md tracking-widest'>
            目次
          </h2>
        </div>
        <ol className='border-l-4'>
          {headings?.current?.map((e, index) => {
            const id = e.id;
            const isActive = active === id;
            return (
              <li key={index} className='my-3'>
                <TocItem
                  text={e.textContent ?? ''}
                  active={isActive}
                  id={id}
                  onClick={(id, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => handleTocItemClick(id, e)}
                />
              </li>
            )
          })}
        </ol>
      </aside>
    </section>
  )

}
export default Toc;