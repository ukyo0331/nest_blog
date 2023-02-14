import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { PostType } from "../types";
import ArticleList from "../src/components/ArticleList";
import { defaultPostsPerPage } from "../src/defaultPostsPerPage";
import Pagination from "../src/components/Pagination";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Custom404 from './404';

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
    const [ totalPage, setTotalPage ] = useState<number>(0)
    const fetchTotalPage = async () => {
        const data: number = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/count/${process.env.NEXT_PUBLIC_USER_ID}`).then((_) => _.data);
        setTotalPage(Math.ceil(data / defaultPostsPerPage));
    }

    useEffect(() => {
        fetchTotalPage()
    }, []);

    //ページ移動のロジック
    const handlePageChange = (num: number) => {
        if (num >= 1 && num <= totalPage) {
            router.push(`${router.pathname}?page=${num}`);
        }
    };
    return (
        <>
            <ArticleList articles={recentPostData}/>
            <Pagination totalPage={totalPage} onPageChange={handlePageChange}/>
        </>
    )
}
export default Blog;