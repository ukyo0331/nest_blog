import type { NextPage } from 'next';
import axios from "axios";
import { GetServerSideProps } from "next";
import ArticleHeadingListLayout from "../src/components/ArticleHeadingListLayout";
import Layout from '../src/components/Layout';
import HeroArea from '../src/components/HeroArea';
import ImageComponent from '../src/components/ImageComponent';

export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
    //最新の記事を6件取得
    const allPostsData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${process.env.NEXT_PUBLIC_USER_ID}`,{
        data: {
            skip: 0,
            take: 6,
        }
    });
    const recentPostData = allPostsData.data;
  return {
    props: {
        recentPostData
    },
  };
};

type SSRProps = {
  recentPostData: any
}

const Home: NextPage<SSRProps> = ({recentPostData}) => {
  return (
      <>
        <Layout title='YUTA code .' desc='YUTAのエンジニアブログです'>
          <HeroArea/>
          <ArticleHeadingListLayout recentPostData={recentPostData}/>
          <ImageComponent imageKey='React.png' />
        </Layout>
      </>
  );
};

export default Home;