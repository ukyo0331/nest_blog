import { LogoutIcon } from '@heroicons/react/solid';
import { router } from 'next/client';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FC, useState } from 'react';

type DashboardSidebarType = {
  handleMenuClick: (e: React.MouseEvent) => void
}
const DashboardSidebar: FC<DashboardSidebarType> = ({handleMenuClick}) => {
  //ログアウト処理
  const queryClient = useQueryClient();
  const logout = async () => {
    queryClient.removeQueries(['user'])
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    await router.push('/login');
  }

  return (
    <>
      <aside className='hidden md:inline-block bg-amber-400 max-w-[300px] flex-grow h-screen fixed w-[30%]'>
        <ul className='flex flex-col items-center pt-12'>
          <li className='custom-button'>
            <button id='create' onClick={e => handleMenuClick(e)}>
              記事作成
            </button>
          </li>
          <li className='custom-button'>
            <button id='draft' onClick={e => handleMenuClick(e)} className='custom-button'>
              下書き一覧
            </button>
          </li>
          <li className='custom-button'>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push('/blog')
              }}
              className='custom-button'>
              記事一覧
            </button>
          </li>
          <li className='custom-button'>
            <button id='comment' onClick={e => handleMenuClick(e)} className='custom-button'>
              コメント一覧
            </button>
          </li>
          <li className='custom-button'>
            <button id='addIcon' onClick={e => handleMenuClick(e)} className='custom-button'>
              アイコン追加
            </button>
          </li>

          <li className='custom-button'>
            ログアウト
            <LogoutIcon
              className='h-6 w-6 cursor-pointer text-blue-500'
              onClick={logout}
            />
          </li>
        </ul>
      </aside>
    </>
  )
}

export default DashboardSidebar;