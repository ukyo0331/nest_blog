import { useRouter } from "next/router";
import { format } from "timeago.js";
import CategoryButton from "./CategoryIconButton";
import { PostType } from "../../types";
import useTilt from '../hooks/tilt/useTilt';

type ArticleHeadingListLayoutType = {
  recentPostData: Array<PostType>,
  options: Object,
}

//記事見出しのレイアウト
const ArticleHeadingListLayout = (prop: ArticleHeadingListLayoutType) => {
  const router = useRouter();
  const { options, recentPostData } = prop;
  const { tiltRefs } = useTilt(recentPostData, options);

  return (
    <section className='pt-24 px-0 w-screen'>
      <div className='m-auto max-w-[1024px] mb-5'>
        <h2 className='min-h-0 font-light text-[clamp(40px,5.2vw,70px)] ml-8'>
          Recent Posts
          <span className='block text-lg text-[#666]'>最近の投稿</span>
        </h2>
        <div className='flex justify-center'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 m-3 w-full max-w-[1024px]'>
            {recentPostData?.map((headline: PostType, index) => {
              const { id, title, categories, likes, createdAt } = headline;
              return (
                <a
                  key={id}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    router.push(`/blog/${id}`)
                  }}
                >
                  <div
                    className='rounded-lg shadow-lg h-48 cursor-pointer break-all relative m-3 bg-white max-w-[320px] mx-auto'
                    ref={tiltRefs.current[index]}
                  >
                    <div className='h-full flex flex-col'>
                      <div className='overflow-scroll hidden-scrollbar ml-2 mt-2 mr-2'>
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
      </div>
    </section>
  )
};

export default ArticleHeadingListLayout;