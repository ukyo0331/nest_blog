import { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

type TableOfContentsProps = {
  desc: string
}
type CustomH1Props = {
  node?: any;
  children?: React.ReactNode;
  activeHeading: string;
}

const CustomH1: FC<CustomH1Props> = ({node, children= '', activeHeading}) => {
  //行数を取得してidに格納する
  const id = node.position?.start.line.toString();
  const isActive = id === activeHeading;
  return (
    <li>
      <a href={`#${id}`}>
        <div className='relative'>
          <div className='absolute top-1'>
            <span className='block w-2 h-2 rounded bg-blue-400'/>
          </div>
          <p className={`${isActive && 'text-amber-700'} ml-3 text-gray-400 border-l-2 border-blue-400 translate-y-2 translate-x-[-9px] pl-3 hover:text-black`}>
            {children}
          </p>
        </div>
      </a>
    </li>
  );
};
const CustomH2: FC<CustomH1Props> = ({node, children= '', activeHeading}) => {
  //行数を取得してidに格納する
  const id = node.position?.start.line.toString();
  const isActive = id === activeHeading;
  return (
    <li>
      <a href={`#${id}`}>
        <div className='relative'>
          <div className='absolute top-2.5'>
            <span className='block w-1.5 h-1.5 rounded bg-blue-400 ml-[1px]'/>
            <span className='block w-0.5 h-5 bg-blue-300 ml-[3px]'/>
          </div>
          <p className={`${isActive && 'text-amber-400'} ml-3 text-gray-400 border-l-2 border-blue-400 translate-y-3 translate-x-[-9px] pl-3 hover:text-black`}>
            {children}
          </p>
        </div>
      </a>
    </li>
  );
};

//記事の見出しコンポーネント
const TableOfContents: FC<TableOfContentsProps> = ({desc}) => {
  const [activeHeading, setActiveHeading] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {threshold: 1, rootMargin: '0% 0px -80% 0px', root: null},
    );
    const heading = document.querySelectorAll('h3, h2');

    heading.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      heading.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, []);
  return (
    <>
      <section>
        <div className='border-2 w-fit h-fit rounded p-2 pb-6'>
          <h2>
            目次
          </h2>
          <ol>
            <ReactMarkdown
              allowedElements={['h1', 'h2']}
              components={{
                h1: (props: CustomH1Props) => <CustomH1 {...props} activeHeading={activeHeading}/>,
                h2: (props: CustomH1Props) => <CustomH2 {...props} activeHeading={activeHeading}/>,
              }}
            >
              {desc}
            </ReactMarkdown>
          </ol>
        </div>
      </section>
    </>
  );
};

export default TableOfContents;