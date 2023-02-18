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
    <section className='pt-[100px] pl-0 pr-0'>
      <div className='m-auto'>
        <h2 className='min-h-0 font-light text-[clamp(40px,5.2vw,70px)] ml-8'>
          Recent Posts
          <span className='block text-lg text-[#666]'>最近の投稿</span>
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-3'>
          {recentPostData?.map((headline: PostType) => {
            const { id, title, categories, likes, createdAt } = headline;
            return (
              <a key={id}
                 onClick={(e) => {
                   e.stopPropagation();
                   e.preventDefault();
                   router.push(`/blog/${id}`)
                 }
                 }>
                <div className='rounded-lg shadow-lg h-48 cursor-pointer break-all relative m-3'>
                  <div className='h-full flex flex-col'>
                    <div className='overflow-scroll hidden-scrollbar ml-2 mt-2'>
                      <CategoryButton
                        categories={categories}
                      />
                    </div>
                    <p className='text-2xl ml-3 mt-1 flex-1 overflow-hidden overflow-ellipsis'>
                      {title}
                    </p>
                    <div className='flex'>
                      <div className='absolute bottom-1 left-1'>
                        ♡{likes}
                      </div>
                      <small className='absolute bottom-1 right-2'>
                        {format(createdAt)}
                      </small>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
};

export default ArticleHeadingListLayout;