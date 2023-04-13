import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RightSidebarCategoryMenu from './RightSidebarCategoryMenu';
import Toc from './Toc';

type Category = {
  name: string;
  posts: string[];
}

const RightSidebar = () => {
  const [categoryData, setCategoryData] = useState<Array<Category>>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get<Array<Category>>(`${process.env.NEXT_PUBLIC_API_URL}/category/${process.env.NEXT_PUBLIC_USER_ID}`).then((_ => _.data));
      console.log(data);
      setCategoryData(data);
    }
    fetchData();
  }, [])
  const categoryArray = categoryData.map((arg) => {
    if (arg.posts.length === 0) return null;
    return arg.name;
  });
  return (
    <div className='hidden md:flex md:justify-end md:w-64 md:h-auto text-[#2B3C5B] flex-none'>
      <div className='w-52 flex flex-col items-center h-fit mt-3 sticky top-[5rem]'>
        <div className={`rounded border-2`}>
          <div className={`flex`}>
            <figure className={`m-5`}>
              <Image
                src='/profile02.jpg'
                alt='製作者のイメージ画像'
                className='rounded'
                width={80}
                height={80}
                style={{ objectFit: 'cover' }}
              />
            </figure>
            <div className={`flex flex-col my-auto`}>
              <figure className={`rounded-full border-2 border-[#2B3C5B]`}>
                <a
                  href='https://github.com/ukyo0331'
                  rel={`筆者githubアカウントです`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                  </svg>
                </a>
              </figure>
              <div>
                <p>Yuta</p>
              </div>
            </div>
          </div>
          <div>
            <p className={`p-3`}>
              30代から小売業→エンジニア転職を目指し、勉強しています。
            </p>
          </div>
        </div>
        <div className={`w-52 mt-3 h-[30vh] overflow-scroll hidden-scrollbar rounded border-2`}>
          <RightSidebarCategoryMenu
            categories={categoryArray as string[]}/>
        </div>
        <div>
          <Toc/>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar;
