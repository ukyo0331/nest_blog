import { FC, Fragment } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type CodeProps = {
  className?: string;
  children?: React.ReactNode;
};

const CodeBlock: FC<CodeProps> = ({ className, children = '' }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match && match[1] ? match[1] : '';
  const code = String(children).replace(/\n$/, '');
  const filename = (className || '').substring((className || '').lastIndexOf(':') + 1);
  return (
    <Fragment>
      {filename && (
        <div className='table bg-[#334155] text-[#f8fafc] max-w-full text-sm rounded-t-md pt-2 px-4 pb-6 mb-[-20px]'>
          <span className=''>{filename}</span>
        </div>
      )}
      <SyntaxHighlighter language={language} style={atomDark}>
        {code}
      </SyntaxHighlighter>
    </Fragment>
  );
};

export default CodeBlock;
