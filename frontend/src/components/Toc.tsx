import React, { useEffect, useRef, useState } from 'react';
import TocItem from './TocItem';
import { useRouter } from 'next/router';

const Toc = () => {
  const router = useRouter();
  const headingRef = useRef<Element[]>();
  const scrollRef = useRef(0);
  const [active, setActive] = useState('');
  useEffect(() => {
    const highlightToc = () => {
      const headings = Array.from(
        document.querySelectorAll('h2[id], h3[id]')
      );
      const ids = headings.map((e) => e.id);
      headingRef.current = headings;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = entry.target.getAttribute('id') ?? '';
            if (entry.isIntersecting) { //entry.isIntersecting: 監視対象の要素　が監視枠に入った状態
              setActive(id);
              scrollRef.current = window.scrollY;
              return;
            }
            const diff = scrollRef.current - window.scrollY;
            const isScrollingUp = diff > 0; //上スクロールしたらtrue
            const currentIndex = ids.indexOf(id);
            const prevEntry = ids[currentIndex - 1];
            if (isScrollingUp) {
              setActive(prevEntry);
            }
          })
        },
        {
          rootMargin: '0% 0% -85% 0%',
          threshold: 0.2,
        }
      );
      headings.forEach((element) => observer.observe(element));
      return () => {
        headings.forEach((element) => observer.unobserve(element));
      };
    }
    const handleRouteChangeComplete = () => {
      highlightToc();
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    highlightToc();

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [headingRef.current]);

  //smooth scrollの実装
  const handleTocItemClick = (id: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setActive(id);
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: 'smooth',
    });
  };
  return (
    <section className='toc-card overflow-y-scroll hidden-scrollbar'>
      <aside className='p-4'>
        <div className='flex gap-4 items-center'>
          <h2 className='text-md tracking-widest'>
            目次
          </h2>
        </div>
        <ol className='border-l-4'>
          {headingRef.current?.map((e, index) => {
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