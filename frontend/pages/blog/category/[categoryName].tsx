import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { PostType } from '../../../types';
import ArticleList from '../../../src/components/ArticleList';
import { defaultPostsPerPage } from '../../../src/defaultPostsPerPage';
import Pagination from '../../../src/components/Pagination';
import usePagination from '../../../src/hooks/pagination/usePagination'
import Custom404 from '../../404';
import RightBar from '../../../src/components/RightBar';

export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
    const categoryName = context.params?.categoryName as string;
    const page = parseInt(context.query.page as string) || 1;
    const take = defaultPostsPerPage;
    const skip = (page - 1) * take;

    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${process.env.NEXT_PUBLIC_USER_ID}/category/${encodeURI(categoryName)}`,{
        data: {
            skip,
            take,
        }
    });
    const recentPostData = data.data
    return {
        props: {
            recentPostData, categoryName: categoryName,
        },
    };
};
type SSRProps = {
    recentPostData: PostType[],
    categoryName: string
}
const CategoryPostListPage: NextPage<SSRProps> = ({recentPostData, categoryName}) => {
    const router = useRouter();
    const totalPage = usePagination(`${process.env.NEXT_PUBLIC_API_URL}/post/${process.env.NEXT_PUBLIC_USER_ID}/count/${categoryName}`);
    const options = {
        scale: 1.2,
        speed: 1000,
        max: 10
    }
    // ページ移動のロジック
    const handlePageChange = (num: number) => {
        if (num >= 1 && num <= totalPage) {
            router.push({
                pathname: router.pathname,
                query: { page: num, categoryName: router.query.categoryName }
            });
        }
    };
    if (recentPostData.length === 0) return <Custom404 />
      return (
        <>
            <div className='min-h-screen h-screen'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-h-[calc(100%-3.75rem)] max-w-[1024px] mx-auto'>
                    <ArticleList articles={recentPostData} options={options}/>
                </div>
                <div className='flex items-end justify-center w-full'>
                    <Pagination totalPage={totalPage} onPageChange={ handlePageChange }/>
                </div>
                <RightBar />
            </div>
        </>
    )
};

export default CategoryPostListPage;
