import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import Layout from '../src/components/Layout';
import { LogoutIcon } from '@heroicons/react/solid';
import { ArticlePostsForm } from '../src/components/ArticlePostsForm';
import { Loader } from '@mantine/core';
import { useQueryUser } from '../src/hooks/user/useQueryUser';
import { useState } from 'react';
import CategoryIconEditor from '../src/components/CategoryIconEditor';
import HamburgerMenu from '../src/components/HamburgerMenu';
import DashboardSidebar from '../src/components/DashboardSidebar';

const Dashboard: NextPage = () => {
    const router = useRouter();
    //レンダリングする画面のコントロール
    const [renderScreen, setRenderScreen] = useState<string>('create');
    const handleMenuClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const clickedMenu = (e.currentTarget as HTMLInputElement).id;
        setRenderScreen(clickedMenu);
    }
    //ログインユーザ情報取得
    const { data: user, status } = useQueryUser();

    if (status === 'loading') return <Loader/>

    return (
        <>
            {/*ログインユーザのみ表示*/}
            {user?.id === process.env.NEXT_PUBLIC_USER_ID ?
              <Layout title='ダッシュボード' desc='ダッシュボードです'>
                  <div className='flex bg-amber-600 w-full h-screen relative'>
                      <HamburgerMenu handleMenuClick={handleMenuClick} />
                      <DashboardSidebar handleMenuClick={handleMenuClick} />
                      <div className='bg-amber-50 flex items-start flex-grow h-fit min-h-screen'>
                          {/*以下、Menuのボタンをクリックした際の表示の出し分け*/}
                          {
                              renderScreen === 'create' &&
                            <div className='md:ml-[calc((100%-30%)/2)] my-16 mx-auto'>
                                <ArticlePostsForm />
                            </div>
                          }
                          {
                              renderScreen === 'addIcon' &&
                            <div className='md:ml-[calc((100%-30%)/2)] my-16 mx-auto'>
                                    <CategoryIconEditor />
                            </div>
                          }
                      </div>
                  </div>
              </Layout>
              : <Loader />
            }
        </>
    )
}

export default Dashboard;