import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../src/components/Layout';
import { ArticlePostsForm } from '../src/components/ArticlePostsForm';
import { Loader } from '@mantine/core';
import { useQueryUser } from '../src/hooks/user/useQueryUser';
import CategoryIconEditor from '../src/components/CategoryIconEditor';
import DashboardHamburgerMenu from '../src/components/DashboardHamburgerMenu';
import DashboardSidebar from '../src/components/DashboardSidebar';
import useHandleMenuClick from '../src/hooks/dashboard/useHandleMenuClick';

const Dashboard: NextPage = () => {
    const router = useRouter();
    //レンダリングする画面のコントロール
    const { renderScreen, handleMenuClick } = useHandleMenuClick();
    //ログインユーザ情報取得
    const { data: user, status } = useQueryUser();

    if (status === 'loading') return <Loader/>

    return (
        <>
            {/*ログインユーザのみ表示*/}
            {user?.id === process.env.NEXT_PUBLIC_USER_ID ?
              <Layout title='ダッシュボード' desc='ダッシュボードです'>
                  <div className='flex bg-amber-600 w-full h-screen relative'>
                      <DashboardHamburgerMenu handleMenuClick={handleMenuClick} />
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