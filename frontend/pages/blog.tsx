import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { PostType } from "../types";
import ArticleList from "../src/components/ArticleList";
import { defaultPostsPerPage } from "../src/defaultPostsPerPage";
import Pagination from "../src/components/Pagination";

export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
    const skip = parseInt(context.query.skip as string) || 0;
    const take = parseInt(context.query.take as string) || defaultPostsPerPage;

    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${process.env.NEXT_PUBLIC_USER_ID}`,{
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
    return (
        <>
            <ArticleList articles={recentPostData}/>
            <Pagination postsPerPage={defaultPostsPerPage} totalPage={10} />
        </>
    )
}
export default Blog;