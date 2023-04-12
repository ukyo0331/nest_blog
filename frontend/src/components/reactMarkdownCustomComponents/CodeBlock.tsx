import { FC, Fragment, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import CopyToClipboard from 'react-copy-to-clipboard'

export type CodeProps = {
  className?: string;
  children?: React.ReactNode;
};

const CodeBlock: FC<CodeProps> = ({ className, children = '' }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match && match[1] ? match[1] : '';
  const code = String(children).replace(/\n$/, '');
  const filename = (className || '').substring((className || '').lastIndexOf(':') + 1);
  //コピーボタンの表示を管理するstate
  const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);
  const [styleTooltip, setStyleTooltip] = useState('opacity-0 hidden');
  //コピーボタンをクリックしたらCopied!を表示させ、3秒後に非表示にする
  const handleClick = () => {
    setStyleTooltip('opacity-1 inline-block');
    setTimeout(() => {
      setStyleTooltip('opacity-0 hidden');
    }, 3000);
  };
  return (
    <div className='w-screen'>
      {filename && (
        <div className='table bg-[#334155] text-[#f8fafc] max-w-full text-sm rounded-t-md pt-2 px-4 pb-6 mb-[-20px]'>
          <span className=''>{filename}</span>
        </div>
      )}
      <div
        onMouseEnter={() => setShowCopyToClipboard(true)}
        onMouseLeave={() => setShowCopyToClipboard(false)}
        className='relative'
      >
        <SyntaxHighlighter language={language} style={atomDark}>
          {code}
        </SyntaxHighlighter>
        {showCopyToClipboard && (
          <div className='absolute cursor-pointer text-[#9ca3af] top-5 right-5'>
            <div
              className={`${styleTooltip} whitespace-nowrap cursor-default absolute top-0 right-6 py-0 px-2 inline-block bg-[#374151] text-[#f9fafb] rounded ease-in`}
            >
              Copied!
            </div>
            <CopyToClipboard text={code} onCopy={() => handleClick()}>
              <svg
                id="btnTarget"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </CopyToClipboard>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeBlock;
