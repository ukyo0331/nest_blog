import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { PostType } from "../types";
import ArticleList from "../src/components/ArticleList";
import { defaultPostsPerPage } from "../src/defaultPostsPerPage";
import Pagination from "../src/components/Pagination";
import { useRouter } from 'next/router';
import useHandleMenuClick from '../src/hooks/dashboard/useHandleMenuClick';
import usePagination from '../src/hooks/pagination/usePagination';
import RightBar from '../src/components/RightBar';

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
    const { handleMenuClick } = useHandleMenuClick();
    return (
        <>
            {/*<DashboardHamburgerMenu handleMenuClick={e => handleMenuClick(e)}/>*/}
            {/*<DashboardSidebar handleMenuClick={e => handleMenuClick(e)}/>*/}
            <div className='flex'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                    <ArticleList articles={recentPostData} options={options}/>
                </div>
                <RightBar />
            </div>
            <Pagination totalPage={totalPage} onPageChange={handlePageChange}/>
        </>
    )
}
export default Blog;