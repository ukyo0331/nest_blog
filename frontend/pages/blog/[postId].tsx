import type { NextPage } from 'next';
import { useRouter } from "next/router";
import axios from "axios";
import Custom404 from '../404'
import { Loader } from "@mantine/core";
import { ArticleLayout } from "../../src/components/ArticleLayout";
import Layout from "../../src/components/Layout";
import { useEffect, useState } from "react";
import { PostType } from "../../types";
import RightSidebar from '../../src/components/RightSidebar';
import LikesButton from '../../src/components/LikesButton';

const ArticlePage: NextPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState<PostType | null>(null);
    //param postIdの利用
    const { postId } = router.query;
    useEffect(() => {
        //postIdが取得される前なら脱出
        if (!postId) return;
        setLoading(true);
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/post/blog/${postId}`)
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(true);
                setLoading(false);
            });
    }, [postId]);

    // /blog/categoryにアクセスされた場合も404を返す
    if (loading) {
        return (
          <Layout title={`ロード中`} desc={`ロード画面です`}>
              <div className='min-h-screen h-screen md:flex md:justify-center'>
                  <div className='min-h-screen h-screen'>
                      <div className='lg:max-w-[calc(1024px-16rem)] w-screen min-h-[calc(100%-3.75rem)] sm:max-w-[33rem] mx-auto'>
                          <div className='flex h-screen w-full justify-center items-center'>
                              <Loader/>
                          </div>
                      </div>
                  </div>
                  <RightSidebar/>
              </div>
          </Layout>
        )
    }
    if (error || postId === 'category' || !data) return <Custom404/>

    try {
        const {id, title, categories, desc, image, likes, status, createdAt, updatedAt, comments} = data;
        return (
            <>
                <Layout title={title} desc='ブログのdescription'>
                    {/*<div className='min-h-screen h-screen md:flex md:justify-center w-[calc(100vw-16rem)] max-w-[1024px]'>*/}
                    {/*    <div className='min-h-screen h-screen bg-blue-300 w-full max-w-[calc(1024px-16rem)]'>*/}
                    {/*        <div className='w-full mx-auto bg-red-300 md:p-10'>*/}
                    {/*            <ArticleLayout*/}
                    {/*              title={title}*/}
                    {/*              categories={categories}*/}
                    {/*              desc={desc}*/}
                    {/*              comments={comments}*/}
                    {/*              updatedAt={updatedAt}*/}
                    {/*              status={status}*/}
                    {/*              createdAt={createdAt}*/}
                    {/*              id={id}*/}
                    {/*              likes={likes}*/}
                    {/*              image={image}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <RightSidebar/>*/}
                    {/*</div>*/}
                    {/*上記だとtable of content 読み込みバグあり*/}
                    {/*<div className='md:flex md:justify-center'>*/}
                    {/*    <div className='flex justify-center sm:w-[80%] w-full'>*/}
                    {/*        <ArticleLayout*/}
                    {/*          title={title}*/}
                    {/*          categories={categories}*/}
                    {/*          desc={desc}*/}
                    {/*          comments={comments}*/}
                    {/*          updatedAt={updatedAt}*/}
                    {/*          status={status}*/}
                    {/*          createdAt={createdAt}*/}
                    {/*          id={id}*/}
                    {/*          likes={likes}*/}
                    {/*          image={image}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <RightSidebar/>*/}
                    {/*</div>*/}
                    {/*上記はリセット用*/}
                    <div className='min-h-screen flex'>
                        <div className=''>
                            <LikesButton postId={postId as string} initialLikes={likes}/>
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
                        <RightSidebar/>
                    </div>
                </Layout>
            </>
        );
    } catch (err) {
        return <Custom404/>
    }
};

export default ArticlePage;
