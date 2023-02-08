import { useRouter } from "next/router";
import { format } from "timeago.js";
import CategoryButton from "./CategoryImageButton";
import { PostType } from "../../types";

type ArticleHeadingListLayoutType = {
    recentPostData: Array<PostType>
}
//記事見出しのレイアウト
const ArticleHeadingListLayout = ({recentPostData}: ArticleHeadingListLayoutType) => {
    const router = useRouter();
    return (
        <>
            {recentPostData?.map((headline: PostType) => {
                const { id, title, categories, likes, createdAt } = headline;

                return (
                    <a key={id}
                       onClick={(e) => {
                           e.preventDefault();
                           router.push(`/blog/${id}`)
                       }
                       }>
                        <div className='border-gray-200 border border-solid-1 rounded h-48 relative m-3 cursor-pointer w-[380px]'>
                            <div>
                                <div>
                                    <CategoryButton
                                        categories={categories}
                                        // onClick={(e) => {
                                        //   e.preventDefault();
                                        //   router.push('/test')
                                        //}}
                                    />
                                </div>
                                <p>
                                    {title}
                                </p>
                                <div className='flex'>
                                    <div>
                                        ♡{likes}
                                    </div>
                                    <div>
                                        {format(createdAt)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                )
            })}
        </>
    )
};

export default ArticleHeadingListLayout;