import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

type TableOfContentsProps = {
  desc: string
}
type CustomH1Props = {
  node?: any;
  children?: React.ReactNode;
}

const CustomH1: FC<CustomH1Props> = ({node, children= ''}) => {
  //行数を取得してidに格納する
  const id = node.position?.start.line.toString();
  return (
    <li>
      <a href={`#${id}`}>
        <div className='relative'>
          <div className='absolute top-1'>
            <span className='block w-2 h-2 rounded bg-blue-400'/>
          </div>
          <p className='ml-3 text-gray-400 border-l-2 border-blue-400 translate-y-2 translate-x-[-9px] pl-3 hover:text-black'>{children}</p>
        </div>
      </a>
    </li>
  );
};
const CustomH2: FC<CustomH1Props> = ({node, children= ''}) => {
  //行数を取得してidに格納する
  const id = node.position?.start.line.toString();
  return (
    <li>
      <a href={`#${id}`}>
        <div className='relative'>
          <div className='absolute top-2.5'>
            <span className='block w-1.5 h-1.5 rounded bg-blue-400 ml-[1px]'/>
            <span className='block w-0.5 h-5 bg-blue-300 ml-[3px]'/>
          </div>
          <p className='ml-3 text-gray-400 border-l-2 border-blue-400 translate-y-3 translate-x-[-9px] pl-3 hover:text-black'>{children}</p>
        </div>
      </a>
    </li>
  );
};

//記事の見出しコンポーネント
const TableOfContents: FC<TableOfContentsProps> = ({desc}) => {
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
                h1: (props: CustomH1Props) => <CustomH1 {...props}/>,
                h2: (props: CustomH1Props) => <CustomH2 {...props}/>,
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