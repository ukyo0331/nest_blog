import type { NextPage } from "next";
import { useRouter } from "next/router";
import axios from 'axios';
import { useQueryClient } from "@tanstack/react-query";
import Layout from "../src/components/Layout";
import { LogoutIcon } from "@heroicons/react/solid";
import { ArticlePostsForm } from "../src/components/ArticlePostsForm";
import { Loader } from '@mantine/core';
import { useQueryUser } from '../src/hooks/user/useQueryUser';
import { useState } from 'react';
import CategoryIconEditor from '../src/components/CategoryIconEditor';

const Dashboard: NextPage = () => {
    //レンダリングする画面のコントロール
    const [renderScreen, setRenderScreen] = useState<string>('create');
    const handleMenuClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const clickedMenu = (e.target as HTMLInputElement).id;
        setRenderScreen(clickedMenu);
    }

    const router = useRouter();
    const { data: user, status } = useQueryUser();
    const queryClient = useQueryClient();
    const logout = async () => {
        queryClient.removeQueries(['user'])
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
        await router.push('/login');
    }
    if (status === 'loading') return <Loader/>
    return (
        <>
            {user?.id === process.env.NEXT_PUBLIC_USER_ID ?
              <Layout title='ダッシュボード' desc='ダッシュボードです'>
                  <div className='flex bg-amber-600 w-full h-screen'>
                      <aside className='hidden md:inline-block bg-amber-400 max-w-[300px] flex-grow h-screen'>
                          <ul className='flex flex-col items-center pt-12'>
                              <li id='create' onClick={e => handleMenuClick(e)} className='custom-button'>記事作成</li>
                              <li id='draft' onClick={e => handleMenuClick(e)} className='custom-button'>下書き一覧</li>
                              <li id='article' onClick={e => handleMenuClick(e)} className='custom-button'>記事一覧</li>
                              <li id='comment' onClick={e => handleMenuClick(e)} className='custom-button'>コメント一覧</li>
                              <li id='addIcon' onClick={e => handleMenuClick(e)} className='custom-button'>アイコン追加</li>
                              <li className='custom-button'>
                                  <span>ログアウト</span>
                                  <LogoutIcon
                                    className='h-6 w-6 cursor-pointer text-blue-500'
                                    onClick={logout}
                                  />
                              </li>
                          </ul>
                      </aside>
                      <div className='bg-amber-50 flex items-center flex-grow'>
                          {
                              renderScreen === 'create'
                                ?
                            <div className='mx-auto'>
                                <ArticlePostsForm />
                            </div>
                                : null
                          }
                          {
                              renderScreen === 'addIcon'
                                ?
                                <div>
                                    <CategoryIconEditor />
                                </div>
                                : null
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