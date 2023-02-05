import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from "next/router";
import axios from "axios";
// import useSWR from 'swr';
//コンポーネント
import Custom404 from '../404'
import { Loader } from "@mantine/core";
import { ArticleLayout } from "../../src/components/ArticleLayout";

//記事読み込み
const Post: NextPage = () => {
    const router = useRouter();
    const { postId } = router.query;
    const { data, error } = useSWR(postId ? `${process.env.NEXT_PUBLIC_API_URL}/post/blog/${postId}` : null, axios);
    // console.log(data)
    if (error) return <Custom404 />
    if (!data){
        return <Loader />
    } else {
        try {
            const { id, title, categories, desc, image, likes, status, createdAt, updatedAt, comments } = data.data;
            return (
                <div>
                    <Head>
                        <title>{title}</title>
                        <meta name="description" content="ブログのログインページです" />
                    </Head>
                    <main>
                        <div>
                            <ArticleLayout
                                title={title}
                                categories={categories}
                                desc={desc}
                                comments={comments}
                                updatedAt={updatedAt}
                                status={status}
                                createdAt={createdAt}
                                id={id}
                                likes={likes}
                                image={image}
                            />
                        </div>
                    </main>
                </div>
            );
        } catch (err) {
            return <Custom404 />
        }
    }
};

export default Post;