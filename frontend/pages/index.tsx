import type { NextPage } from 'next';
import axios from "axios";
import { GetServerSideProps } from "next";
import ArticleHeadingListLayout from "../src/components/ArticleHeadingListLayout";
import Layout from '../src/components/Layout';
import HeroArea from '../src/components/HeroArea';
import ProfileArea from '../src/components/ProfileArea';
import AboutThisPageArea from '../src/components/AboutThisPageArea';

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
  //vanilla tiltのオプション
  const options = {
    scale: 1.2,
    speed: 1000,
    max: 10
  }
  return (
      <>
        <Layout title='YUTA code .' desc='YUTAのエンジニアブログです'>
          <HeroArea/>
          <ProfileArea/>
          <AboutThisPageArea/>
          <ArticleHeadingListLayout
            recentPostData={recentPostData}
            options={options}
          />
        </Layout>
      </>
  );
};

export default Home;