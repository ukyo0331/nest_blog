import { FC } from 'react';
import useStore from "../store/postStore";
import { useMutatePost } from "../hooks/post/useMutatePost";
import { useRouter } from "next/router";
import { format } from "timeago.js";
import { PostType } from "../../types";
import CategoryIconButton from "./CategoryIconButton";
import { useQueryUserWithoutRedirect } from '../hooks/user/useQueryUser';
import useHandleMenuClick from '../hooks/dashboard/useHandleMenuClick';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './reactMarkdownCustomComponents/CodeBlock';
import { CodeProps } from './reactMarkdownCustomComponents/CodeBlock';
import { H1Props } from './reactMarkdownCustomComponents/H1Block';
import H1Block from './reactMarkdownCustomComponents/H1Block';
import H2Block, { H2Props } from './reactMarkdownCustomComponents/H2Block';
import ABlock, { AProps } from './reactMarkdownCustomComponents/ABlock';
import PBlock, { PProps } from './reactMarkdownCustomComponents/PBlock';

//個々のブログ記事のレイアウト
export const ArticleLayout: FC<Omit<PostType, 'userId'>> = (
    {
        id,
        title,
        desc,
        likes,
        status,
        createdAt,
        updatedAt,
        image,
        categories
    }) => {
    const update = useStore((state) => state.updateEditedPost);
    const { deletePostMutation } = useMutatePost();
    const router = useRouter();
    const { data: user } = useQueryUserWithoutRedirect();

    //時間の取り扱い
    const createTime = new Date(createdAt);
    const updateTime = new Date(updatedAt);
    //カテゴリを配列で取得
    const categoryNames = categories?.map((c) => c.category.name).join(", ") || "";
    const { setRenderScreen } = useHandleMenuClick();

    return (
        <article key={id} className='lg:max-w-[calc(1024px-16rem)] sm:max-w-[calc(768px-16rem)] w-screen'>
          <div>
              <div>
                  <CategoryIconButton categories={categories}/>
              </div>
              <h1 className={`p-4 text-3xl`} id={`0`}>
                {title}{status === 'draft' && '（下書き）'}
              </h1>
              <small>
                  更新:{updateTime.getFullYear()}年{updateTime.getMonth()+1}月{updateTime.getDate()}日<br />
                  作成:{createTime.getFullYear()}年{createTime.getMonth()+1}月{createTime.getDate()}日
              </small>
              <small>{format(createdAt)}</small>
              {user?.id === process.env.NEXT_PUBLIC_USER_ID ?
                <>
                  <button
                    onClick={() => {
                      update({
                        id, title, desc, status, name: categoryNames
                      });
                      setRenderScreen('createPost');
                      router.push('/dashboard')
                    }}
                  >
                    編集
                  </button>
                  <button
                    onClick={() => {
                      deletePostMutation.mutate(id)
                      router.push('/');
                    }}
                  >
                    削除
                  </button>
                </>
                : ''
              }
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: (props: CodeProps) => <CodeBlock {...props}/>,
                h1: (props: H1Props) => <H1Block {...props}/>,
                h2: (props: H2Props) => <H2Block {...props}/>,
                a: (props: AProps) => <ABlock {...props}/>,
                p: (props: PProps) => <PBlock {...props}/>,
              }}
            >
              {desc}
            </ReactMarkdown>
          </div>
        </article>
    )
}
