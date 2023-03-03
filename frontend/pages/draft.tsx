import { NextPage } from 'next';
import { PostType } from '../types';
import ArticleList from '../src/components/ArticleList';
import { useRouter } from 'next/router';
import { useQueryDrafts } from '../src/hooks/post/useQueryPosts';

const Draft: NextPage = () => {
  const router = useRouter();
  //レンダリングする画面のコントロール
  const { data } = useQueryDrafts();
  return (
    <>
      <ArticleList articles={data as PostType[]}/>
    </>
  )
}
export default Draft;