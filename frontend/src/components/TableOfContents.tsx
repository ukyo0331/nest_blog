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
      <a href={`#${id}`}>{children}</a>
    </li>
  )
}
//記事の見出しコンポーネント
const TableOfContents: FC<TableOfContentsProps> = ({desc}) => {
  return (
    <>
      <ol>
        <ReactMarkdown
          allowedElements={['h1']}
          components={{
            h1: (props: CustomH1Props) => <CustomH1 {...props}/>
          }}
        >
          {desc}
        </ReactMarkdown>
      </ol>
    </>
  );
};

export default TableOfContents;