import React, { useEffect, useState } from 'react';
import tocbot from 'tocbot';

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
      <section className={`w-52 h-fit rounded border-2 m-3`}>
        <div>
          <nav className={`toc w-full h-full p-3`}/>
        </div>
      </section>
    </>
  )
}
export default Toc;