import { LogoutIcon } from '@heroicons/react/solid';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FC, useState } from 'react';
import { useRouter } from 'next/router';

//menuを配列で管理
export const menuList = [
  {
    title: '記事作成',
    id: 'createPost',
  },
  {
    title: '下書き一覧',
    id: 'draftList',
  },
  {
    title: '記事一覧',
    id: 'articleList',
    goto: '/blog',
  },
  {
    title: 'コメント一覧',
    id: 'commentList',
  },
  {
    title: 'アイコン追加',
    id: 'addIcon',
  },
]

type DashboardSidebarType = {
  handleMenuClick: (e: React.MouseEvent) => void
}

const DashboardSidebar: FC<DashboardSidebarType> = ({handleMenuClick}) => {
  const router = useRouter();
  //ログアウト処理
  const queryClient = useQueryClient();
  const logout = async () => {
    queryClient.removeQueries(['user'])
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    await router.push('/login');
  }

  return (
    <>
      <aside className='hidden md:inline-block bg-amber-400 max-w-[300px] flex-grow h-screen fixed w-[30%] opacity-20'>
        <ul className='flex flex-col items-center pt-12'>
          {menuList.map((_, index) => {
            return (
              <li key={index}
                  className='w-full h-12 flex justify-center relative font-bold hover:text-amber-600 hover:bg-amber-700'
              >
                <button
                 className='w-full'
                 id={_.id}
                 onClick={e => {
                   handleMenuClick(e);
                   if (_.goto) router.push(_.goto)
                 }}
                >
                  {_.title}
                </button>
              </li>
            )
          })}
          <li
            className='h-12 w-full flex justify-center items-center cursor-pointer font-bold hover:text-amber-600 hover:bg-amber-700'
          >
            ログアウト
            <LogoutIcon
              className='h-6 w-6 cursor-pointer text-blue-500'
              onClick={logout}
            />
          </li>
        </ul>
      </aside>
      <div className='hidden md:inline-block max-w-[300px] h-screen w-[30%] bg-black'></div>
    </>
  )
}

export default DashboardSidebar;