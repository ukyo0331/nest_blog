import { useEffect, useRef, useState } from 'react';
import TocItem from './toxItem';

const toc = () => {
  const headingRef = useRef<Element[]>();
  const scrollRef = useRef(0);
  const [active, setActive] = useState('');
  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll('h2[id], h3[id]')
    );
    const ids = headings.map((e) => e.id);
    headingRef.current = headings;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id') ?? '';
          if (entry.isIntersecting) {
            setActive(id);
            scrollRef.current = window.scrollY;
            return;
          }
          const diff = scrollRef.current - window.scrollY;
          const isScrollingUp = diff > 0;
          const currentIndex = ids.indexOf(id);
          const prevEntry = ids[currentIndex - 1];
          if (isScrollingUp) {
            const id = prevEntry;
            setActive(id);
          }
        });
      },
      {
        rootMargin: '0% 0% -85% 0%',
        threshold: 0.2,
      }
    );
    headings.forEach((e) => observer.observe(e));
  }, []);

  const handleTocItemClick = (id: string) => {
    setActive(id);
  }
  return (
    <section className='toc-card sticky top-4 z-40'>
      <aside className='p-4'>
        <div className='flex gap-4 items-center'>
          <h2 className='text-md  uppercase tracking-widest'>
            Table Contents
          </h2>
        </div>
        <ol>
          {headingRef.current?.map((e, index) => {
            const id = e.id;
            const isActive = active == id;
            return (
              <li key={index} className='my-3'>
                <TocItem
                  text={e.textContent ?? ''}
                  active={isActive}
                  id={id}
                  onClick={() => handleTocItemClick(id)}
                />
              </li>
            )
          })}
        </ol>
      </aside>
    </section>
  )

}
export default toc;