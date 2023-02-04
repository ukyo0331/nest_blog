import { useRouter } from "next/router";
import { format } from "timeago.js";
import CategoryButton from "./CategoryImageButton";
import { PostType } from "../../types";

type ArticleHeadingListLayoutType = {
    recentPostData: Array<PostType>
}

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
                           router.push(`/post/${id}`)
                       }
                       }>
                        <div>
                            <div>
                                <div>
                                    <CategoryButton
                                        key={id}
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
                                <div>
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

            })
            }
        </>
    )
};

export default ArticleHeadingListLayout;