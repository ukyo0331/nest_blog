import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { PostType } from "../types";
import ArticleList from "../src/components/ArticleList";
import { defaultPostsPerPage } from "../src/defaultPostsPerPage";
import Pagination from "../src/components/Pagination";
import { useEffect, useState } from 'react';

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
    const [ totalPage, setTotalPage ] = useState<number>(0)
    const fetchTotalPage = async () => {
        const data: number = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/count/${process.env.NEXT_PUBLIC_USER_ID}`).then((_) => _.data);
        setTotalPage(Math.ceil(data / defaultPostsPerPage));

    }
    useEffect(() => {
        fetchTotalPage()
    }, []);
    return (
        <>
            <ArticleList articles={recentPostData}/>
            <Pagination postsPerPage={defaultPostsPerPage} totalPage={totalPage} />
        </>
    )
}
export default Blog;