import type { NextPage } from 'next';
import { useRouter } from "next/router";
import axios from "axios";
import Custom404 from '../../404'
import { Loader } from '@mantine/core';
import { ArticleLayout } from "../../../src/components/ArticleLayout";
import Layout from "../../../src/components/Layout";
import { useEffect, useState } from "react";
import { PostType } from "../../../types";
import { GetServerSideProps } from "next";
import ArticleList from "../../../src/components/ArticleList";
import { defaultPostsPerPage } from "../../../src/defaultPostsPerPage";
import Pagination from '../../../src/components/Pagination';
import { marked } from 'marked';
import use = marked.use;

export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
    const categoryName = context.query.categoryName;
    const page = parseInt(context.query.skip as string) || 1;
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
            recentPostData
        },
    };
};
type SSRProps = {
    recentPostData: PostType[]
}
const CategoryPostListPage: NextPage<SSRProps> = ({recentPostData}) => {
    const router = useRouter();
    const categoryName = router.query.categoryName;
    const [ totalPage, setTotalPage ] = useState<number>(0);
    const fetchTotalPage = async () => {
        const data: number = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${process.env.NEXT_PUBLIC_USER_ID}/count/${categoryName}`).then((_) => _.data);
        setTotalPage(Math.ceil(data / defaultPostsPerPage));

    }
    useEffect(() => {
        fetchTotalPage()
    }, []);
    return (
        <>
            <ArticleList articles={recentPostData}></ArticleList>
            <Pagination totalPage={totalPage} postsPerPage={defaultPostsPerPage} />
        </>
    )
};

export default CategoryPostListPage;
