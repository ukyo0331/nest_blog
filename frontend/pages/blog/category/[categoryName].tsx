import type { NextPage } from 'next';
import { useRouter } from "next/router";
import axios from "axios";
import Custom404 from '../../404'
import { Loader } from "@mantine/core";
import { ArticleLayout } from "../../../src/components/ArticleLayout";
import Layout from "../../../src/components/Layout";
import { useEffect, useState } from "react";
import { PostType } from "../../../types";
import { GetServerSideProps } from "next";
import ArticleList from "../../../src/components/ArticleList";

export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
    const categoryName = context.query.categoryName;
    const skip = parseInt(context.query.skip as string) || 0;
    const take = parseInt(context.query.take as string) || 8;
    //最新の記事を6件取得
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
    console.log(recentPostData)

    return (
        <>
            <ArticleList articles={recentPostData}></ArticleList>
        </>
    )
};

export default CategoryPostListPage;
