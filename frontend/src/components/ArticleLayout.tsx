import { FC } from "react";
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
    const inputCategoryArray = [];
    if (categories) {
        for (let i = 0; i < categories.length; i++) {
            inputCategoryArray.push(categories[i].category.name)
        }
    }
    const name = inputCategoryArray.join(', ')

    return (
        <article key={id}>
            <div>
                <div>
                    <CategoryImageButton onClick={(e) => e.preventDefault()} categories={categories}/>
                </div>
                <h2>{title}{status === 'draft' && '（下書き）'}</h2>
                <small>
                    更新:{updateTime.getFullYear()}年{updateTime.getMonth()+1}月{updateTime.getDate()}日<br />
                    作成:{createTime.getFullYear()}年{createTime.getMonth()+1}月{createTime.getDate()}日
                </small>
                <small>{format(createdAt)}</small>
                <button
                    onClick={() => {
                        update({
                            id, title, desc, status, name
                        });
                        router.push('/dashboard')
                    }}
                >編集</button>
                <button
                    onClick={() => {
                        deletePostMutation.mutate(id);
                    }}
                >削除</button>
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked(desc ? desc : 'not found'))}}></div>
                <p>{likes}人が拍手しました</p>
            </div>
        </article>
    )
}
