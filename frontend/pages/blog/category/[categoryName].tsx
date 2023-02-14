import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PostType } from '../../../types';
import ArticleList from '../../../src/components/ArticleList';
import { defaultPostsPerPage } from '../../../src/defaultPostsPerPage';
import Pagination from '../../../src/components/Pagination';

export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
    const categoryName = context.params?.categoryName as string;
    const page = parseInt(context.query.page as string) || 1;
    const take = defaultPostsPerPage;
    const skip = (page - 1) * take;

    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${process.env.NEXT_PUBLIC_USER_ID}/category/${categoryName}`,{
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
    // const categoryName = router.query.categoryName;
    const [ totalPage, setTotalPage ] = useState<number>(0);
    const fetchTotalPage = async () => {
        const data: number = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${process.env.NEXT_PUBLIC_USER_ID}/count/${categoryName}`).then((_) => _.data);
        setTotalPage(Math.ceil(data / defaultPostsPerPage));

    }
    useEffect(() => {
        fetchTotalPage()
    }, []);
    // ページ移動のロジック
    const handlePageChange = (num: number) => {
        if (num >= 1 && num <= totalPage) {
            // setCurrentPage(num);
            // router.push(`${router.pathname}?page=${num}`);
            router.push({
                pathname: router.pathname,
                query: { page: num, categoryName: router.query.categoryName }
            });
        }
    };
    return (
        <>
            <ArticleList articles={recentPostData}></ArticleList>
            <Pagination totalPage={totalPage} onPageChange={handlePageChange}/>
        </>
    )
};

export default CategoryPostListPage;
