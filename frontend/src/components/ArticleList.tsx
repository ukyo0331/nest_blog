import { FC } from "react";
import { PostType } from "../../types";
import CategoryIconButton from "./CategoryIconButton";

type ArticleListProps = {
    articles: PostType[];
}

const ArticleList: FC<ArticleListProps> = ({articles}) => {
    return (
        <>
            {articles.map((article) => {
                const { id, title, categories, likes, createdAt } = article;
                return (
                    <div key={id}>
                        {title}
                        <CategoryIconButton categories={categories}/>
                    </div>
                )
            })}
        </>
    )
}
export default ArticleList;