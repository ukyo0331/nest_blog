import { NextPage } from 'next';
import { PostType } from '../types';
import ArticleList from '../src/components/ArticleList';
import { useQueryDrafts } from '../src/hooks/post/useQueryPosts';
import { Loader } from '@mantine/core';

const Draft: NextPage = () => {
  const options = {
    scale: 1.2,
    speed: 1000,
    max: 10
  }
  //レンダリングする画面のコントロール
  const { data } = useQueryDrafts();
  if (!data) return <Loader />
  return (
    <>
      <ArticleList articles={data as PostType[]} options={options}/>
    </>
  )
}
export default Draft;