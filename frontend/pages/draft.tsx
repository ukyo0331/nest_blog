import { NextPage } from 'next';
import { PostType } from '../types';
import ArticleList from '../src/components/ArticleList';
import { useRouter } from 'next/router';
import { useQueryDrafts } from '../src/hooks/post/useQueryPosts';

const Draft: NextPage = () => {
  const router = useRouter();
  const options = {
    scale: 1.2,
    speed: 1000,
    max: 10
  }
  //レンダリングする画面のコントロール
  const { data } = useQueryDrafts();
  return (
    <>
      <ArticleList articles={data as PostType[]} options={options}/>
    </>
  )
}
export default Draft;