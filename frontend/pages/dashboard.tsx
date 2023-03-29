import type { NextPage } from 'next';
import Layout from '../src/components/Layout';
import { ArticlePostsForm } from '../src/components/ArticlePostsForm';
import { Loader } from '@mantine/core';
import { useQueryUser } from '../src/hooks/user/useQueryUser';
import CategoryIconEditor from '../src/components/CategoryIconEditor';
import DashboardHamburgerMenu from '../src/components/DashboardHamburgerMenu';
import DashboardSidebar from '../src/components/DashboardSidebar';
import useHandleMenuClick from '../src/hooks/dashboard/useHandleMenuClick';
import DraftList from '../src/components/DraftList';

//menu毎の表記させるコンポーネントを配列で管理
const menuList = [
    {
        renderScreen: 'createPost',
        component: ArticlePostsForm,
    },
    {
        renderScreen: 'draftList',
        component: DraftList,
    },
    {
        renderScreen: 'addIcon',
        component: CategoryIconEditor,
    },
]

const Dashboard: NextPage = () => {
    //レンダリングする画面のコントロール
    const { renderScreen, handleMenuClick } = useHandleMenuClick();
    //ログインユーザ情報取得
    const { data: user, status } = useQueryUser();
    console.log(user?.id)

    if (status === 'loading') {
        return (
          <div className='flex justify-center items-center h-screen'>
              <Loader />
          </div>
        );
    }

    return (
        <>
            {/*ログインユーザのみ表示*/}
            {user?.id === process.env.NEXT_PUBLIC_USER_ID ?
              <Layout title='ダッシュボード' desc='ダッシュボードです'>
                  <div className='flex bg-amber-600 w-full h-screen relative'>
                      <DashboardHamburgerMenu handleMenuClick={handleMenuClick} />
                      <DashboardSidebar handleMenuClick={handleMenuClick} />
                      <div className='bg-amber-50 flex items-center flex-grow h-fit min-h-screen'>
                          {/*Menuのボタンをクリックした際の表示の出し分け*/}
                          {menuList.map((_, index) => {
                              return (
                                renderScreen === _.renderScreen &&
                                <div className='my-16 mx-auto' key={index}>
                                    <_.component/>
                                </div>
                              );
                          })}
                      </div>
                  </div>
              </Layout>
              : <Loader />
            }
        </>
    )
}

export default Dashboard;