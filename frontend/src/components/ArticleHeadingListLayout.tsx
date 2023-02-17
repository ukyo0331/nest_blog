import { useRouter } from "next/router";
import { format } from "timeago.js";
import CategoryButton from "./CategoryImageButton";
import { PostType } from "../../types";
import { useState } from 'react';

type ArticleHeadingListLayoutType = {
  recentPostData: Array<PostType>
}
//記事見出しのレイアウト
const ArticleHeadingListLayout = ({recentPostData}: ArticleHeadingListLayoutType) => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 500);
  };
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {recentPostData?.map((headline: PostType) => {
        const { id, title, categories, likes, createdAt } = headline;

        return (
          <a key={id}
             onClick={(e) => {
               e.preventDefault();
               router.push(`/blog/${id}`)
             }
             }>
            <div className='rounded-lg shadow-lg h-36 cursor-pointer break-all relative m-3'>
              <div>
                <div className='overflow-scroll hidden-scrollbar ml-2 mt-2'>
                  <CategoryButton
                    categories={categories}
                  />
                </div>
                <p className='text-4xl m-3'>
                  {title}
                </p>
                <div className='flex'>
                  <div className='absolute bottom-1 left-1'>
                    ♡{likes}
                  </div>
                  <div className='absolute bottom-1 right-2'>
                    {format(createdAt)}
                  </div>
                </div>
              </div>
            </div>
          </a>
        )
      })}
    </div>
  )
};

export default ArticleHeadingListLayout;