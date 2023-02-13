import { FC } from 'react';
import useStore from "../store/postStore";
import { useMutatePost } from "../hooks/post/useMutatePost";
import { useRouter } from "next/router";
import { format } from "timeago.js";
import DOMPurify from "dompurify";
import { marked } from "marked";
import highlightjs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";
import { PostType } from "../../types";
import CategoryImageButton from "./CategoryImageButton";
import { useQueryUserWithoutRedirect } from '../hooks/user/useQueryUser';

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

    //コードのハイライト設定
    marked.setOptions({
        highlight: (code, lang) => {
            return highlightjs.highlightAuto(code, [lang]).value;
        },
    });
    //時間の取り扱い
    const createTime = new Date(createdAt);
    const updateTime = new Date(updatedAt);
    //カテゴリを配列で取得
    const categoryNames = categories?.map((c) => c.category.name).join(", ") || "";

    return (
        <article key={id}>
            <div>
                <div>
                    <CategoryImageButton categories={categories}/>
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

                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked(desc ? desc : 'not found'))}}></div>
                <p>{likes}人が拍手しました</p>
            </div>
        </article>
    )
}
