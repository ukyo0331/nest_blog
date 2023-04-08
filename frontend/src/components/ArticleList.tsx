import { FC } from "react";
import { PostType } from "../../types";
import CategoryButton from './CategoryIconButton';
import { format } from 'timeago.js';
import { useRouter } from 'next/router';
import useTilt from '../hooks/tilt/useTilt';

type ArticleListProps = {
    articles: PostType[];
    options: Object;
}

const ArticleList: FC<ArticleListProps> = ({ articles, options }) => {
    const router = useRouter();
    const { tiltRefs } = useTilt(articles, options);
    return (
        <>
            {articles?.map((article, index) => {
                const { id, title, categories, likes, createdAt, desc, status } = article;
                //記事一覧に表示するヘッドラインを40文字以内に収める
                const headline = title.length < 40 ? title: `${title.slice(0, 40)}...`
                return (
                  <a
                    key={id}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        status === 'published'
                          ? router.push(`/blog/${id}`)
                          : router.push(`/draft/${id}`)
                       }
                    }
                    className='w-fit h-fit'
                  >
                      <div
                        className='rounded-lg shadow-lg h-48 cursor-pointer break-all relative m-3 bg-white sm:w-60 max-w-[320px] w-screen'
                        ref={tiltRefs.current[index]}
                      >
                          <div className='h-full flex flex-col'>
                              <div className='overflow-scroll hidden-scrollbar ml-2 mt-2 mr-2'>
                                  <CategoryButton
                                    categories={categories}
                                  />
                              </div>
                              <p className='text-xl ml-3 mt-1 flex-1 overflow-hidden overflow-ellipsis'>
                                  {headline}
                              </p>
                              <div className='flex'>
                                  <div className='absolute bottom-1 left-3 flex'>
                                      <figure>
                                          <svg xmlns="http://www.w3.org/2000/svg"
                                               className="w-6 h-6"
                                               viewBox="0 0 24 24"
                                               strokeWidth="1.5"
                                               stroke="gray"
                                               fill="none"
                                               strokeLinecap="round"
                                               strokeLinejoin="round">
                                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                              <path
                                                d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                          </svg>
                                      </figure>
                                      <span>
                                          {likes}
                                      </span>
                                  </div>
                                  <small className='absolute bottom-1 right-2'>
                                      {format(createdAt)}
                                  </small>
                              </div>
                          </div>
                      </div>
                  </a>
                );
            })}
        </>
    );
};

export default ArticleList;
