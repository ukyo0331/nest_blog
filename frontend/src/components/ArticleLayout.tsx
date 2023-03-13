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
import TableOfContents from './TableOfContents';
import H2Block, { H2Props } from './reactMarkdownCustomComponents/H2Block';

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
        <article key={id} className='sm:w-[95%] w-full'>
          <TableOfContents desc={desc}/>
          <div>
              <div>
                  <CategoryIconButton categories={categories}/>
              </div>
              <h2>{title}{status === 'draft' && '（下書き）'}</h2>
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
              }}
            >
              {desc}
            </ReactMarkdown>
              <p>{likes}人が拍手しました</p>
          </div>
        </article>
    )
}
