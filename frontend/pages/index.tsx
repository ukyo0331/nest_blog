import type { NextPage } from 'next';
import Head from 'next/head';
import axios from "axios";
import { GetServerSideProps } from "next";
//コンポーネント


export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
    //最新の記事を6件取得
    const allPostsData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${process.env.USER_ID}`,{
        data: {
            skip: 0,
            take: 6,
        }
    });
    const recentPostData = allPostsData.data
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
      <div>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/frontend/public/favicon.ico" />
        </Head>
          {console.log(recentPostData)}
      </div>
  );
};

export default Home;