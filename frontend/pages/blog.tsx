import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { PostType } from "../types";
import ArticleList from "../src/components/ArticleList";
import { defaultPostsPerPage } from "../src/defaultPostsPerPage";
import Pagination from "../src/components/Pagination";
import { useRouter } from 'next/router';
import useHandleMenuClick from '../src/hooks/dashboard/useHandleMenuClick';
import usePagination from '../src/hooks/pagination/usePagination';
import RightSidebar from '../src/components/RightSidebar';
import Layout from '../src/components/Layout';

export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
    const page = parseInt(context.query.page as string) || 1;
    const take = defaultPostsPerPage;
    const skip = (page - 1) * take;

    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/post/${process.env.NEXT_PUBLIC_USER_ID}`,
      {
        data: {
            skip,
            take,
        }
    });
    const recentPostData = data.data
    return {
        props: {
            recentPostData
        },
    };
};

type SSRProps = {
    recentPostData: PostType[]
}

const Blog: NextPage<SSRProps> = ({recentPostData}) => {
    const router = useRouter();
    const totalPage = usePagination(`${process.env.NEXT_PUBLIC_API_URL}/post/count/${process.env.NEXT_PUBLIC_USER_ID}`)
    const options = {
        scale: 1.2,
        speed: 1000,
        max: 10
    }
    //ページ移動のロジック
    const handlePageChange = (num: number) => {
        if (num >= 1 && num <= totalPage) {
            router.push(`${router.pathname}?page=${num}`);
        }
    };
    //レンダリングする画面のコントロール
    // const { handleMenuClick } = useHandleMenuClick();
    return (
        <>
            <Layout title={`articles list`} desc={`ブログ記事一覧ページです`}>
                <div className='min-h-screen md:flex md:justify-center'>
                    <div className='min-h-screen max-w-[calc(1024px-16rem)'>
                        <div className='w-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-h-[calc(100%-3.75rem)] max-w-[1024px] mx-auto content-start'>
                            <ArticleList articles={recentPostData} options={options}/>
                        </div>
                        <div className='flex items-end justify-center w-full'>
                            <Pagination totalPage={totalPage} onPageChange={ handlePageChange }/>
                        </div>
                    </div>
                    <RightSidebar/>
                </div>
            </Layout>
        </>
    )
}
export default Blog;