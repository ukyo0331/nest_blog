import type { NextPage } from 'next';
import { useRouter } from "next/router";
import axios from "axios";
import Custom404 from '../404'
import { Loader } from "@mantine/core";
import { ArticleLayout } from "../../src/components/ArticleLayout";
import Layout from "../../src/components/Layout";
import { useQueryPost } from "../../src/hooks/post/useQuertPosts";

const ArticlePage: NextPage = () => {
    const router = useRouter();
    //param postIdの利用
    const { postId } = router.query;

    const { data, isLoading, error } = useQueryPost(postId ? postId.toString() : '');

    if (error) return <Custom404 />
    if (isLoading) return <Loader />
    if (!data) return null;

    try {
        const { id, title, categories, desc, image, likes, status, createdAt, updatedAt, comments } = data;
        return (
            <>
                <Layout title='ブログ' desc='ブログ詳細' >
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
                </Layout>

            </>
        );
    } catch (err) {
        return <Custom404 />
    }
};

export default ArticlePage;
