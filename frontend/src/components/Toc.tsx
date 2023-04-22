import React, { useEffect, useState } from 'react';
import TocItem from './TocItem';
import useTOC from '../hooks/toc/useTOC';
import tocbot from 'tocbot';
import { element } from 'prop-types';
import Head from 'next/head';

const Toc = () => {
  useEffect(() => {
    setTimeout(() => {
      tocbot.init({
        tocSelector: '.toc',
        contentSelector: '.post',
        headingSelector: 'h1, h2, h3'
      })
    }, 3000);

    return () => tocbot.destroy();
  },[]);
  return (
    <>
      <section className={`w-52 h-[30vh]`}>
        <div>
          <nav className={`toc w-full h-full`}/>
        </div>
      </section>
    </>
  )
//   const { active, headingRef, handleTocItemClick } = useTOC();
//
//   return (
//     <section className='toc-card overflow-y-scroll hidden-scrollbar'>
//       <aside className='p-4'>
//         <div className='flex gap-4 items-center'>
//           <h2 className='text-md tracking-widest'>
//             目次
//           </h2>
//         </div>
//         <ol className='border-l-4'>
//           {headingRef.current?.map((e: Element, index: number) => {
//             if (index === 0) {
//               return ( null )
//             }
//             const id = e.id;
//             const isActive = active === id;
//             return (
//               <li key={index} className='my-3'>
//                 <TocItem
//                   text={e.textContent ?? ''}
//                   active={isActive}
//                   id={id}
//                   onClick={(id, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => handleTocItemClick(id, e)}
//                 />
//               </li>
//             )
//           })}
//         </ol>
//       </aside>
//     </section>
//   )
}
export default Toc;